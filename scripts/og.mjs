// Renders public/og.png (1200×630): name + headline on the page background.
// Re-run with `npm run og` after changing the name or headline in src/data/profile.ts.
// Needs Playwright: `npm i -D playwright && npx playwright install chromium`.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const src = readFileSync(root + 'src/data/profile.ts', 'utf8');
const name = src.match(/\n  name: '([^']+)'/)[1];
const headline = JSON.parse(src.match(/headline: (\[[^\]]+\])/)[1].replace(/'/g, '"'));
const font = (p) => 'data:font/woff2;base64,' + readFileSync(root + 'node_modules/@fontsource-variable/' + p).toString('base64');

const html = `<!doctype html><html><head><style>
@font-face{font-family:M;src:url(${font('manrope/files/manrope-latin-wght-normal.woff2')}) format('woff2');font-weight:200 800}
@font-face{font-family:D;src:url(${font('dm-sans/files/dm-sans-latin-opsz-normal.woff2')}) format('woff2');font-weight:100 1000}
body{margin:0;width:1200px;height:630px;background:#0f1012;color:#f0eee8;box-sizing:border-box;padding:80px 88px;display:flex;flex-direction:column;justify-content:space-between}
.label{font:500 20px/1.4 D;letter-spacing:.12em;text-transform:uppercase;color:#a19e97;display:flex;justify-content:space-between}
.label i{font-style:normal;font:600 40px/1 M;letter-spacing:-.06em;color:#f0eee8;text-transform:none}.label i b{color:#f2c275;font-weight:600}
h1{margin:0;font:500 104px/1.02 M;letter-spacing:-.05em}
h1 em{font-style:normal;color:#f2c275}
</style></head><body>
<div class="label"><span>${name}</span><i>j<b>.</b></i></div>
<h1>${headline[0]}<br>${headline[1]}<em>${headline[2]}</em></h1>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: root + 'public/og.png' });
await browser.close();
console.log('wrote public/og.png');
