// Moves the built index.html out of the static publish directory and into the
// SSR bundle as a JS module. Netlify serves static files before the server, so
// leaving index.html in dist/client would bypass server-side rendering for "/".
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const clientHtml = path.join(root, 'dist/client/index.html')
const html = await fs.readFile(clientHtml, 'utf-8')

await fs.writeFile(
  path.join(root, 'dist/server/template.js'),
  `export default ${JSON.stringify(html)};\n`,
)
await fs.rm(clientHtml)
console.log('SSR template written to dist/server/template.js')
