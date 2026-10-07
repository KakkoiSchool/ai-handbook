import { openContext } from './_profile.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const url = process.argv[2];
if (!url || !/^https:\/\//.test(url)) throw new Error('Usage: npm run inspect -- https://...');

const here = path.dirname(fileURLToPath(import.meta.url));
const screenshot = path.join(here, 'inspection.png');
const context = await openContext();
const page = context.pages()[0] || await context.newPage();
const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.screenshot({ path: screenshot, fullPage: true });
const body = (await page.locator('body').innerText()).replace(/\s+/g, ' ').trim();
console.log(JSON.stringify({
  requestedUrl: url,
  finalUrl: page.url(),
  status: response?.status() ?? null,
  title: await page.title(),
  bodyPreview: body.slice(0, 3000),
  screenshot,
}, null, 2));
console.log('Close the browser when finished.');
