// Renders each React page to static HTML and injects it into the built HTML files,
// so content is visible before JavaScript loads (faster first paint, better SEO).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { pages } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

for (const [file, render] of Object.entries(pages)) {
  const htmlPath = path.join(root, 'dist', file);
  const html = fs.readFileSync(htmlPath, 'utf8');
  if (!html.includes('<div id="root"></div>')) throw new Error(`Root placeholder not found in dist/${file}`);
  fs.writeFileSync(htmlPath, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
  console.log(`Pre-rendered dist/${file}`);
}
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
