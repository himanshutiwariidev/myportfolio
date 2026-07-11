const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Whitelist of allowed image MIME types and their canonical extensions.
// Both MIME type AND the original file extension must be in this map —
// an attacker sending a PHP file with Content-Type: image/jpeg is rejected
// because '.php' is not a value in MIME_TO_EXT.
const MIME_TO_EXT = {
  'image/jpeg': '.jpg',
  'image/jpg':  '.jpg',
  'image/png':  '.png',
  'image/webp': '.webp',
  'image/gif':  '.gif',
};
const ALLOWED_EXTENSIONS = new Set(Object.values(MIME_TO_EXT));

// 5 MB per upload
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    // Never use the original filename — generate a cryptographically random
    // name and force the extension from the validated MIME type.
    const ext = MIME_TO_EXT[file.mimetype] || '.jpg';
    const randomHex = crypto.randomBytes(16).toString('hex');
    cb(null, `${Date.now()}-${randomHex}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  // 1. Check MIME type
  if (!MIME_TO_EXT[file.mimetype]) {
    return cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed'));
  }

  // 2. Also check the file extension from the original name so a renamed
  //    script (e.g. shell.php renamed to shell.jpg is fine, but shell.php
  //    with image/jpeg MIME is caught here as a secondary guard).
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext && !ALLOWED_EXTENSIONS.has(ext)) {
    return cb(new Error('File extension is not allowed'));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE_BYTES },
});

module.exports = upload;
