// Renders the React app to static HTML and injects it into dist/index.html,
// so the page content is visible before JavaScript loads (faster first paint, better SEO).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist', 'index.html');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render } = await import(pathToFileURL(serverEntry).href);
const html = fs.readFileSync(htmlPath, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Root placeholder not found in dist/index.html');

fs.writeFileSync(htmlPath, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log('Pre-rendered dist/index.html');
