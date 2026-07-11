/* global process */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createServer as createViteServer } from 'vite'
import { guardRequest } from './middleware/security.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT) || 5173

async function createAppServer() {
  const app = express()

  // ── Trust the load-balancer / Nginx reverse-proxy in production ─────────────
  // Required so express-rate-limit reads the real client IP from X-Forwarded-For
  // rather than the proxy's IP.  Set to 1 if there is exactly one proxy hop.
  if (isProduction) app.set('trust proxy', 1)

  // ── Security middleware (production only) ────────────────────────────────────
  // Dev mode is excluded so Vite's HMR websocket and eval()-based source maps
  // are not broken by strict CSP / other header constraints.
  if (isProduction) {
    // Helmet — sets security-focused HTTP response headers
    app.use(
      helmet({
        // Content-Security-Policy
        // 'unsafe-inline' in scriptSrc is required by the inline Google Analytics
        // snippet in index.html.  All other directives are as strict as possible.
        contentSecurityPolicy: {
          directives: {
            defaultSrc:             ["'self'"],
            scriptSrc:              ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'],
            styleSrc:               ["'self'", "'unsafe-inline'"],
            imgSrc:                 ["'self'", 'data:', 'blob:', 'https:'],
            fontSrc:                ["'self'", 'data:'],
            // 'https:' covers the backend API (VITE_API_URL) and GA data endpoints
            connectSrc:             [
              "'self'",
              'https://www.google-analytics.com',
              'https://region1.google-analytics.com',
              'https://analytics.google.com',
              'https:',
            ],
            mediaSrc:               ["'self'"],
            objectSrc:              ["'none'"],
            frameSrc:               ["'none'"],
            frameAncestors:         ["'none'"],   // equivalent to X-Frame-Options: DENY
            baseUri:                ["'self'"],
            formAction:             ["'self'"],
            upgradeInsecureRequests: [],
          },
        },
        // HSTS — tell browsers to always use HTTPS for the next year
        hsts: {
          maxAge:            31536000,  // 1 year in seconds
          includeSubDomains: true,
          preload:           true,
        },
        // Override Helmet 8's default 'no-referrer' — that would show all
        // traffic as "direct" in Google Analytics.  strict-origin-when-cross-origin
        // sends the origin (no path) on cross-origin requests, which is safe.
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        // COEP can block Google Tag Manager iframes; disable here and rely on
        // Cross-Origin-Resource-Policy (set by Helmet by default) instead.
        crossOriginEmbedderPolicy: false,
        // Helmet sets X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
        // Permissions-Policy, X-XSS-Protection, X-DNS-Prefetch-Control,
        // X-Download-Options, X-Permitted-Cross-Domain-Policies automatically.
      })
    )

    // Rate limiting — admin area is throttled much more tightly than general traffic
    const adminLimiter = rateLimit({
      windowMs:        60_000,   // 1 minute window
      max:             20,       // 20 requests per window per IP
      standardHeaders: 'draft-7',
      legacyHeaders:   false,
      handler: (_req, res) =>
        res.status(429).type('text/plain').send('Too Many Requests — try again later.'),
    })
    const generalLimiter = rateLimit({
      windowMs:        60_000,   // 1 minute window
      max:             150,      // 150 requests per window per IP
      standardHeaders: 'draft-7',
      legacyHeaders:   false,
      handler: (_req, res) =>
        res.status(429).type('text/plain').send('Too Many Requests — try again later.'),
    })

    // Route each request to the correct limiter so headers reflect the actual
    // limit that applies — admin paths get the tighter 20/min budget.
    app.use((req, res, next) => {
      const limiter = req.path.startsWith('/admin') ? adminLimiter : generalLimiter
      limiter(req, res, next)
    })

    // Request guard — blocks bad HTTP methods, oversized URLs, known attack
    // scanner user-agents, and URLs containing injection/traversal patterns
    app.use(guardRequest)
  }

  // ── Static asset serving or Vite dev middleware ──────────────────────────────
  let viteServer
  let template
  let render

  if (isProduction) {
    template = await fs.readFile(
      path.join(__dirname, 'dist/client/index.html'),
      'utf-8'
    )
    ;({ render } = await import(
      pathToFileURL(path.join(__dirname, 'dist/server/entry-server.js')).href
    ))

    // Serve Vite-generated assets (JS, CSS, images, fonts).
    // index.html is excluded (index: false) so SSR handles all HTML responses.
    // All fingerprinted assets get a 1-year immutable cache; raw assets get no-cache.
    app.use(
      express.static(path.join(__dirname, 'dist/client'), {
        index:  false,
        maxAge: '1y',
        immutable: true,
        setHeaders(res, filePath) {
          if (path.extname(filePath) === '.html') {
            res.setHeader('Cache-Control', 'no-cache')
          }
        },
      })
    )
  } else {
    viteServer = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(viteServer.middlewares)
  }

  // ── SSR catch-all — renders every unmatched route as an HTML page ────────────
  app.use(async (req, res) => {
    const url = req.url
    try {
      let htmlTemplate
      let renderApp

      if (viteServer) {
        const rawTemplate = await fs.readFile(
          path.join(__dirname, 'index.html'),
          'utf-8'
        )
        htmlTemplate = await viteServer.transformIndexHtml(url, rawTemplate)
        ;({ render: renderApp } = await viteServer.ssrLoadModule('/src/entry-server.jsx'))
      } else {
        htmlTemplate = template
        renderApp    = render
      }

      const rendered = await renderApp(url)
      const appHtml  = typeof rendered === 'string' ? rendered : rendered.appHtml
      const headHtml = typeof rendered === 'string' ? ''        : rendered.headHtml || ''

      const html = htmlTemplate
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--ssr-head-->',   headHtml)

      // HTML pages must not be cached by the browser or CDN
      res.setHeader('Cache-Control', 'no-cache')
      res.status(200).type('text/html').send(html)
    } catch (error) {
      // Fix Vite's SSR stack trace in dev for easier debugging
      if (viteServer) viteServer.ssrFixStacktrace(error)

      // Never leak internal stack traces in production
      const body = isProduction
        ? 'Internal Server Error'
        : (error instanceof Error ? error.stack ?? error.message : String(error))

      res.status(500).type('text/plain').send(body)
    }
  })

  return app
}

const app = await createAppServer()
app.listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`)
})
