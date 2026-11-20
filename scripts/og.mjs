// Renders public/og.png (1200×630): rails + name, plain. Re-run with `npm run og`
// after changing the name or title in src/data/profile.ts.
// Uses Playwright's Chromium (install with `npx playwright install chromium` if needed).
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const src = readFileSync(root + 'src/data/profile.ts', 'utf8');
const pick = (key) => src.match(new RegExp(`\\n  ${key}: '([^']+)'`))[1];
const name = pick('name');
const title = pick('title');
const font = (p) =>
  'data:font/woff2;base64,' + readFileSync(root + 'node_modules/@fontsource-variable/' + p).toString('base64');

const html = `<!doctype html><html><head><style>
@font-face{font-family:L;src:url(${font('literata/files/literata-latin-opsz-normal.woff2')}) format('woff2');font-weight:200 900}
@font-face{font-family:A;src:url(${font('archivo/files/archivo-latin-wdth-normal.woff2')}) format('woff2');font-weight:100 900;font-stretch:62% 125%}
body{margin:0;width:1200px;height:630px;background:#F6F7F5;color:#1B2430;display:flex;flex-direction:column;justify-content:space-between;padding:84px 80px 96px;box-sizing:border-box}
h1{margin:0;font-family:L;font-weight:500;font-size:132px;line-height:.92;letter-spacing:-.035em}
p{margin:0;font-family:A;font-stretch:85%;font-size:34px;color:#4E5661}
.t{display:flex;align-items:center;gap:0}
.rails{flex:1;height:10px;background-image:repeating-linear-gradient(90deg,#9AA0A6 0 3px,transparent 3px 15px);border-top:3px solid #1B2430;border-bottom:3px solid #1B2430}
.stop{width:16px;height:46px;background:#1F5F4A;border-radius:2px}
</style></head><body>
<div><h1>${name.replace(' ', '<br>')}</h1></div>
<div style="display:flex;flex-direction:column;gap:36px"><p>${title}</p><div class="t"><div class="rails"></div><div class="stop"></div></div></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: root + 'public/og.png' });
await browser.close();
console.log('wrote public/og.png');
