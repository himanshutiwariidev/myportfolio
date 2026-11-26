import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { guardRequest } from "../../middleware/security.js";
import { apiRouter, uploadsRouter } from "../../api/router.js";
// Both files are produced by `npm run build` before the server is bundled.
// @ts-expect-error generated at build time
import { render } from "../../dist/server/entry-server.js";
// @ts-expect-error generated at build time
import template from "../../dist/server/template.js";

const app = express();
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        fontSrc: ["'self'", "data:"],
        connectSrc: [
          "'self'",
          "https://www.google-analytics.com",
          "https://region1.google-analytics.com",
          "https://analytics.google.com",
          "https:",
        ],
        mediaSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    crossOriginEmbedderPolicy: false,
  }),
);

const limiterOptions = {
  windowMs: 60_000,
  standardHeaders: "draft-7" as const,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  handler: (_req: express.Request, res: express.Response) =>
    res.status(429).type("text/plain").send("Too Many Requests — try again later."),
};
const adminLimiter = rateLimit({ ...limiterOptions, limit: 20 });
const generalLimiter = rateLimit({ ...limiterOptions, limit: 150 });

app.use(guardRequest);

// Blog API and uploaded images
app.use("/api", apiRouter);
app.use("/uploads", generalLimiter, uploadsRouter);

// Server-side rendering for every other page
app.use((req, res, next) => (req.path.startsWith("/admin") ? adminLimiter : generalLimiter)(req, res, next));

app.use(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return res.status(405).type("text/plain").send("Method Not Allowed");
  }
  try {
    const rendered = await render(req.originalUrl);
    const appHtml = typeof rendered === "string" ? rendered : rendered.appHtml;
    const headHtml = typeof rendered === "string" ? "" : rendered.headHtml || "";
    const html = template.replace("<!--ssr-outlet-->", () => appHtml).replace("<!--ssr-head-->", () => headHtml);
    res.setHeader("Cache-Control", "no-cache");
    res.status(200).type("text/html").send(html);
  } catch (error) {
    console.error(error);
    res.status(500).type("text/plain").send("Internal Server Error");
  }
});

app.listen(Number(process.env.PORT) || 3000);
