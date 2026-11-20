// Renders every route to static HTML after `vite build` so crawlers and
// link-preview bots that don't run JavaScript still see each page's content and tags.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { notFoundMeta, pageMeta, routes, SITE_URL } from '../src/pageMeta.js'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = `${root}dist`
const ssrEntry = `${root}dist-ssr/entry-server.js`

const { render } = await import(pathToFileURL(ssrEntry).href)
const template = await readFile(`${dist}/index.html`, 'utf8')

function escapeAttr(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function setAttr(html, selector, attr, value) {
  const pattern = new RegExp(`(<${selector}[^>]*?\\s${attr}=")[^"]*(")`)
  if (!pattern.test(html)) throw new Error(`prerender: missing <${selector}> in index.html`)
  return html.replace(pattern, `$1${escapeAttr(value)}$2`)
}

function pageHtml(path, meta) {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  let html = template.replace('<!--app-html-->', render(path))

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`)
  html = setAttr(html, 'meta name="description"', 'content', meta.description)
  html = setAttr(html, 'meta property="og:title"', 'content', meta.title)
  html = setAttr(html, 'meta property="og:description"', 'content', meta.description)
  html = setAttr(html, 'meta name="twitter:title"', 'content', meta.title)
  html = setAttr(html, 'meta name="twitter:description"', 'content', meta.description)

  if (path === '/404') {
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, '\n    <meta name="robots" content="noindex" />')
    html = html.replace(/\s*<meta property="og:url"[^>]*>/, '')
  } else {
    html = setAttr(html, 'link rel="canonical"', 'href', url)
    html = setAttr(html, 'meta property="og:url"', 'content', url)
  }

  return html
}

for (const path of routes) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`
  await writeFile(`${dist}/${file}`, pageHtml(path, pageMeta[path]))
  console.log(`prerendered ${path} -> dist/${file}`)
}

await writeFile(`${dist}/404.html`, pageHtml('/404', notFoundMeta))
console.log('prerendered 404 -> dist/404.html')

await rm(`${root}dist-ssr`, { recursive: true, force: true })
