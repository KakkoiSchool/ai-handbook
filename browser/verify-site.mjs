import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const url = process.argv[2];
if (!url || !/^https:\/\//.test(url)) throw new Error('Usage: npm run verify -- https://...');

const here = path.dirname(fileURLToPath(import.meta.url));
const screenshot = path.join(here, 'site-verification.png');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const response = await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: screenshot, fullPage: true });
console.log(JSON.stringify({
  requestedUrl: url,
  finalUrl: page.url(),
  status: response?.status() ?? null,
  ok: !!response && response.status() >= 200 && response.status() < 400,
  title: await page.title(),
  screenshot,
}, null, 2));
await browser.close();
