import { mkdir, readFile, writeFile } from 'node:fs/promises';
const routes = ['about', 'services', 'services/home-loan', 'services/personal-loan', 'services/auto-loan', 'services/overdraft', 'calculators', 'contact', 'privacy', 'terms'];
const html = await readFile('dist/index.html', 'utf8');
for (const route of routes) { await mkdir(`dist/${route}`, { recursive: true }); await writeFile(`dist/${route}/index.html`, html); }
await writeFile('dist/404.html', html);
