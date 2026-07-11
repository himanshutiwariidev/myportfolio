import sharp from 'sharp'
import { readdirSync, statSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const assetsDir  = join(__dirname, '../src/assets')

const pngFiles = readdirSync(assetsDir).filter(
  (f) => extname(f) === '.png' && f !== 'logo.svg' && f !== 'sticker.png'
)

for (const file of pngFiles) {
  const src  = join(assetsDir, file)
  const dest = join(assetsDir, basename(file, '.png') + '.webp')

  const before = statSync(src).size
  await sharp(src).webp({ quality: 82 }).toFile(dest)
  const after = statSync(dest).size

  const saved = (((before - after) / before) * 100).toFixed(1)
  console.log(`${file}  →  ${basename(dest)}  (${(before/1024).toFixed(0)} KB → ${(after/1024).toFixed(0)} KB, -${saved}%)`)
}
