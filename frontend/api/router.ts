import crypto from "node:crypto";
import path from "node:path";
import express, { type NextFunction, type Request, type Response } from "express";
import multer from "multer";
import rateLimit from "express-rate-limit";
import { getStore } from "@netlify/blobs";
import { and, desc, eq, ne } from "drizzle-orm";
import { db } from "../db/index.js";
import { blogs, type Blog } from "../db/schema.js";

// ── Image uploads (kept in memory, then persisted to Netlify Blobs) ───────────
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};
const EXT_TO_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};
const ALLOWED_EXTENSIONS = new Set([...Object.values(MIME_TO_EXT), ".jpeg"]);
const UPLOAD_KEY_PATTERN = /^\d+-[a-f0-9]{32}\.(jpg|png|webp|gif)$/;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!MIME_TO_EXT[file.mimetype]) {
      return cb(new HttpError(400, "Only JPEG, PNG, WebP, and GIF images are allowed"));
    }
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext && !ALLOWED_EXTENSIONS.has(ext)) {
      return cb(new HttpError(400, "File extension is not allowed"));
    }
    cb(null, true);
  },
});

const imageStore = () => getStore("blog-images");

const saveUploadedImage = async (file?: Express.Multer.File) => {
  if (!file) return "";
  const ext = MIME_TO_EXT[file.mimetype] || ".jpg";
  const key = `${Date.now()}-${crypto.randomBytes(16).toString("hex")}${ext}`;
  const bytes = file.buffer.buffer.slice(
    file.buffer.byteOffset,
    file.buffer.byteOffset + file.buffer.byteLength,
  ) as ArrayBuffer;
  await imageStore().set(key, bytes);
  return `/uploads/${key}`;
};

const removeUploadedImage = async (imagePath?: string | null) => {
  if (!imagePath || !imagePath.startsWith("/uploads/")) return;
  const key = imagePath.replace("/uploads/", "");
  if (!UPLOAD_KEY_PATTERN.test(key)) return;
  await imageStore().delete(key);
};

// ── Helpers ───────────────────────────────────────────────────────────────────
class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const createSlug = (value: unknown = "") =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Keep the response shape the frontend already expects (Mongo-style `_id`).
const serialize = (blog: Blog) => ({ _id: blog.id, ...blog });

const ensureUniqueSlug = async (slug: string, blogId?: string) => {
  const condition = blogId ? and(eq(blogs.slug, slug), ne(blogs.id, blogId)) : eq(blogs.slug, slug);
  const [existing] = await db.select({ id: blogs.id }).from(blogs).where(condition).limit(1);
  if (existing) throw new HttpError(400, "Slug already exists. Please use a different slug.");
};

const findById = async (id: string) => {
  if (!UUID_PATTERN.test(id)) return undefined;
  const [blog] = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
  return blog;
};

const safeEqual = (a: string, b: string) => {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
};

const adminConfig = () => ({
  id: process.env.ADMIN_ID || "",
  password: process.env.ADMIN_PASSWORD || "",
  token: process.env.ADMIN_TOKEN || "",
});

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
const wrap = (fn: Handler) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next);

// ── Middleware ────────────────────────────────────────────────────────────────
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const { token: expected } = adminConfig();
  const authHeader = req.headers.authorization || "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const headerToken = req.headers["x-admin-token"];
  const token = bearer || (typeof headerToken === "string" ? headerToken : "");

  if (!expected || !token || !safeEqual(token, expected)) {
    return res.status(401).json({ success: false, message: "Unauthorized. Valid admin token is required." });
  }
  next();
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: { success: false, message: "Too many login attempts — please try again after 15 minutes." },
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: { success: false, message: "Too many requests — please try again later." },
});

// ── API routes ────────────────────────────────────────────────────────────────
export const apiRouter = express.Router();

apiRouter.use(apiLimiter);
apiRouter.use(express.json({ limit: "1mb" }));
apiRouter.use(express.urlencoded({ limit: "1mb", extended: true }));

apiRouter.post("/admin/login", loginLimiter, (req, res) => {
  const { adminId, password } = req.body || {};
  const config = adminConfig();

  if (!config.id || !config.password || !config.token) {
    return res.status(503).json({ success: false, message: "Admin login is not configured." });
  }
  if (!adminId || !password) {
    return res.status(400).json({ success: false, message: "Admin ID and password are required." });
  }
  if (!safeEqual(String(adminId), config.id) || !safeEqual(String(password), config.password)) {
    return res.status(401).json({ success: false, message: "Invalid admin ID or password." });
  }
  return res.json({ success: true, message: "Login successful.", token: config.token });
});

apiRouter.get(
  "/blogs",
  wrap(async (_req, res) => {
    const rows = await db.select().from(blogs).where(eq(blogs.isPublished, true)).orderBy(desc(blogs.createdAt));
    res.json({ success: true, count: rows.length, data: rows.map(serialize) });
  }),
);

apiRouter.get(
  "/blogs/:slug",
  wrap(async (req, res) => {
    const [blog] = await db
      .select()
      .from(blogs)
      .where(and(eq(blogs.slug, String(req.params.slug)), eq(blogs.isPublished, true)))
      .limit(1);
    if (!blog) throw new HttpError(404, "Blog not found");
    res.json({ success: true, data: serialize(blog) });
  }),
);

apiRouter.get(
  "/admin/blogs",
  adminAuth,
  wrap(async (_req, res) => {
    const rows = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
    res.json({ success: true, count: rows.length, data: rows.map(serialize) });
  }),
);

apiRouter.post(
  "/blogs",
  adminAuth,
  upload.single("image"),
  wrap(async (req, res) => {
    const body = req.body || {};
    const slug = createSlug(body.slug || body.title);
    if (!slug) throw new HttpError(400, "Slug is required");
    if (!str(body.title)) throw new HttpError(400, "Blog title is required");
    if (!body.content) throw new HttpError(400, "Blog content is required");

    await ensureUniqueSlug(slug);
    const image = await saveUploadedImage(req.file);

    try {
      const [blog] = await db
        .insert(blogs)
        .values({
          title: str(body.title),
          slug,
          metaTitle: str(body.metaTitle),
          metaDescription: str(body.metaDescription),
          content: String(body.content),
          shortDescription: str(body.shortDescription),
          image,
          imageAlt: str(body.imageAlt),
          author: str(body.author) || "TechnicalTiwariji",
          isPublished: body.isPublished === undefined ? true : String(body.isPublished) === "true",
        })
        .returning();
      res.status(201).json({ success: true, message: "Blog created successfully", data: serialize(blog) });
    } catch (error) {
      await removeUploadedImage(image);
      throw error;
    }
  }),
);

apiRouter.put(
  "/blogs/:id",
  adminAuth,
  upload.single("image"),
  wrap(async (req, res) => {
    const body = req.body || {};
    const blog = await findById(String(req.params.id));
    if (!blog) throw new HttpError(404, "Blog not found");

    const slug = createSlug(body.slug || blog.slug || body.title);
    if (!slug) throw new HttpError(400, "Slug is required");
    await ensureUniqueSlug(slug, blog.id);

    const newImage = await saveUploadedImage(req.file);

    try {
      const [updated] = await db
        .update(blogs)
        .set({
          title: str(body.title) || blog.title,
          slug,
          metaTitle: str(body.metaTitle),
          metaDescription: str(body.metaDescription),
          content: body.content ? String(body.content) : blog.content,
          shortDescription: str(body.shortDescription),
          image: newImage || blog.image,
          imageAlt: str(body.imageAlt),
          author: str(body.author) || "technicaltiwarijii",
          isPublished: body.isPublished === undefined ? blog.isPublished : String(body.isPublished) === "true",
          updatedAt: new Date(),
        })
        .where(eq(blogs.id, blog.id))
        .returning();

      if (newImage) await removeUploadedImage(blog.image);
      res.json({ success: true, message: "Blog updated successfully", data: serialize(updated) });
    } catch (error) {
      await removeUploadedImage(newImage);
      throw error;
    }
  }),
);

apiRouter.delete(
  "/blogs/:id",
  adminAuth,
  wrap(async (req, res) => {
    const blog = await findById(String(req.params.id));
    if (!blog) throw new HttpError(404, "Blog not found");
    await db.delete(blogs).where(eq(blogs.id, blog.id));
    await removeUploadedImage(blog.image);
    res.json({ success: true, message: "Blog deleted successfully" });
  }),
);

apiRouter.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
apiRouter.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ success: false, message: error.message });
  }
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: error.message });
  }
  console.error(error);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

// ── Uploaded image serving ────────────────────────────────────────────────────
export const uploadsRouter = express.Router();

uploadsRouter.get(
  "/:key",
  wrap(async (req, res) => {
    const key = String(req.params.key);
    if (!UPLOAD_KEY_PATTERN.test(key)) return res.status(404).type("text/plain").send("Not Found");

    const data = await imageStore().get(key, { type: "arrayBuffer" });
    if (!data) return res.status(404).type("text/plain").send("Not Found");

    res.setHeader("Content-Type", EXT_TO_MIME[path.extname(key)] || "application/octet-stream");
    // Keys are random and never reused, so the image can be cached for a long time.
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Netlify-CDN-Cache-Control", "public, max-age=31536000, immutable, durable");
    res.send(Buffer.from(data));
  }),
);
