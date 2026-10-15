import { readdir, readFile, access } from 'node:fs/promises';
let missing = [];
for (const file of await readdir('.')) {
 if (!file.endsWith('.html')) continue;
 const html = await readFile(file, 'utf8');
 for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
  const path = match[1].split('#')[0].split('?')[0];
  if (!path || /^(?:https?:|data:|mailto:|tel:|\/\/)/.test(path)) continue;
  try { await access(path); } catch { missing.push(`${file}: ${path}`); }
 }
}
if (missing.length) { console.error(missing.join('\n')); process.exit(1); }
console.log('All local HTML assets and links exist.');
