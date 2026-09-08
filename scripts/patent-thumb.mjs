import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = 'c:/Project/LuaWeb';
const pdfPath = path.join(root, 'apps/web/public/static/downloads/patent-10-2980502.pdf');
const outPath = path.join(root, 'apps/web/public/static/images/company/patent-10-2980502-thumb.png');
const pdfUrl = `file:///${pdfPath.replace(/\\/g, '/')}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 840, height: 1188 } });
await page.goto(pdfUrl, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
console.log('saved', outPath);
