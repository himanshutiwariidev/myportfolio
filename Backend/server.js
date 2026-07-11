const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;
const isProd = process.env.NODE_ENV === 'production';

// Trust Nginx reverse-proxy so rate limiters read the real client IP
// (X-Forwarded-For), not the proxy's loopback address.
if (isProd) app.set('trust proxy', 1);

// ── Security headers via Helmet ───────────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────────────────────
// In production, only the known frontend origin is permitted.
// In dev, localhost ports 5173 and 3000 are allowed.
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL]
  : isProd
  ? []
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (same-origin, curl, Postman in dev)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Token'],
    credentials: true,
  })
);

// ── Body parsing with size limits ─────────────────────────────────────────────
// Limits prevent denial-of-service via huge request payloads.
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// ── NoSQL injection sanitization ──────────────────────────────────────────────
// Strips MongoDB operator keys ($, .) from req.body / req.params / req.query
// so an attacker cannot inject { "$ne": null } to bypass auth filters.
app.use(mongoSanitize());

// ── Rate limiting ─────────────────────────────────────────────────────────────
// Login endpoint: tight limit to block credential brute-force attacks.
const loginLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,   // 15-minute window
  max:             10,                // 10 attempts per window per IP
  standardHeaders: 'draft-7',
  legacyHeaders:   false,
  message: { success: false, message: 'Too many login attempts — please try again after 15 minutes.' },
});

// General API: prevents scraping and automated abuse.
const apiLimiter = rateLimit({
  windowMs:        60 * 1000,   // 1-minute window
  max:             100,          // 100 requests per window per IP
  standardHeaders: 'draft-7',
  legacyHeaders:   false,
  message: { success: false, message: 'Too many requests — please try again later.' },
});

app.use('/api/admin/login', loginLimiter);
app.use('/api', apiLimiter);

// ── Static file serving for uploaded blog images ──────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health-check (no sensitive info)
app.get('/', (_req, res) => res.json({ success: true, message: 'Blog API is running' }));

app.use('/api', blogRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
