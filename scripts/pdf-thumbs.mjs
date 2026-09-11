// Generates first-page JPEG covers for certificate PDFs.
// Usage: npm run gen:thumbs   (re-run whenever PDFs are added/changed)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const certDir = path.join(root, 'public', 'images', 'Certificates-main', 'Certificates-main')
const outDir = path.join(root, 'public', 'images', 'thumbs')

globalThis.DOMMatrix ??= DOMMatrix
globalThis.ImageData ??= ImageData
globalThis.Path2D ??= Path2D

const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')

fs.mkdirSync(outDir, { recursive: true })

const pdfs = fs.readdirSync(certDir).filter(f => f.toLowerCase().endsWith('.pdf'))
let done = 0
for (const file of pdfs) {
  const inPath = path.join(certDir, file)
  const outPath = path.join(outDir, file + '.jpg')
  if (fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs >= fs.statSync(inPath).mtimeMs) {
    console.log('skip (fresh):', file)
    continue
  }
  try {
    const data = new Uint8Array(fs.readFileSync(inPath))
    const pdf = await getDocument({ data }).promise
    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: 0.6 })
    const canvas = createCanvas(Math.floor(viewport.width), Math.floor(viewport.height))
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    await page.render({ canvasContext: ctx, viewport }).promise
    const buf = await canvas.encode('jpeg', 78)
    fs.writeFileSync(outPath, buf)
    console.log('thumb:', file, '->', Math.round(buf.length / 1024) + 'KB')
    done++
  } catch (err) {
    console.error('FAILED:', file, String(err && err.message || err).slice(0, 160))
  }
}
console.log(`Done. ${done} generated, ${pdfs.length} total PDFs.`)
