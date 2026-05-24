/* global process */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import http from 'node:http'
import { createServer as createViteServer } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT) || 5173

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function send(response, statusCode, body, headers = {}) {
  response.writeHead(statusCode, headers)
  response.end(body)
}

async function serveStaticFile(requestPath, response) {
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, '')
  const filePath = path.join(__dirname, 'dist/client', safePath)

  try {
    const stat = await fs.stat(filePath)
    if (!stat.isFile()) {
      return false
    }

    const ext = path.extname(filePath).toLowerCase()
    const content = await fs.readFile(filePath)
    send(response, 200, content, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    })
    return true
  } catch {
    return false
  }
}

async function createAppServer() {
  let vite
  let template
  let render

  if (isProduction) {
    template = await fs.readFile(path.join(__dirname, 'dist/client/index.html'), 'utf-8')
    ;({ render } = await import(pathToFileURL(path.join(__dirname, 'dist/server/entry-server.js')).href))
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
  }

  return http.createServer(async (req, res) => {
    const url = req.url || '/'

    try {
      if (!isProduction && vite) {
        vite.middlewares(req, res, async () => {
          await renderPage(url, res, vite, null, null)
        })
        return
      }

      const served = await serveStaticFile(url.split('?')[0], res)
      if (served) {
        return
      }

      await renderPage(url, res, null, template, render)
    } catch (error) {
      const stack = error instanceof Error ? error.stack ?? error.message : String(error)
      send(res, 500, stack, { 'Content-Type': 'text/plain; charset=utf-8' })
    }
  })
}

async function renderPage(url, res, vite, productionTemplate, productionRender) {
  const cleanUrl = url.split('?')[0]
  let htmlTemplate
  let renderApp

  if (vite) {
    const rawTemplate = await fs.readFile(path.join(__dirname, 'index.html'), 'utf-8')
    htmlTemplate = await vite.transformIndexHtml(cleanUrl, rawTemplate)
    ;({ render: renderApp } = await vite.ssrLoadModule('/src/entry-server.jsx'))
  } else {
    htmlTemplate = productionTemplate
    renderApp = productionRender
  }

  const rendered = await renderApp(cleanUrl)
  const appHtml = typeof rendered === 'string' ? rendered : rendered.appHtml
  const htmlWithApp = htmlTemplate.replace('<!--ssr-outlet-->', appHtml)
  const html = typeof rendered === 'string' ? htmlWithApp : injectSeo(htmlWithApp, rendered.seo)

  send(res, 200, html, { 'Content-Type': 'text/html; charset=utf-8' })
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function injectSeo(html, seo = {}) {
  const title = escapeHtml(seo.title)
  const description = escapeHtml(seo.description)
  const canonical = escapeHtml(seo.canonical)

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`)
}

const server = await createAppServer()

server.listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`)
})
