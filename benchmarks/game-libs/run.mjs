import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const rel = pathname === '/' ? '/kaplay.html' : pathname;
  const file = path.normalize(path.join(root, rel));
  if (!file.startsWith(root)) {
    res.writeHead(403).end('forbidden');
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404).end('not found');
      return;
    }
    res.setHeader('Content-Type', contentTypes[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch({
  headless: true,
  args: [
    '--disable-gpu-vsync',
    '--disable-frame-rate-limit',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
  ],
});

const counts = [100, 500, 1000, 5000];
const cases = [
  { id: 'kaplay', page: 'kaplay.html' },
  { id: 'kaplay-area', page: 'kaplay.html', query: '&area=1' },
  { id: 'kontra', page: 'kontra.html' },
  { id: 'littlejs', page: 'littlejs.html' },
];

const results = [];
for (const test of cases) {
  for (const n of counts) {
    const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
    const errors = [];
    page.on('pageerror', e => errors.push(String(e.message || e)));
    page.on('console', m => {
      if (m.type() === 'error') errors.push(m.text());
    });

    const url = `${base}/${test.page}?n=${n}${test.query || ''}`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    try {
      await page.waitForFunction(() => window.benchResult, null, { timeout: 120000 });
      const result = await page.evaluate(() => window.benchResult);
      results.push({ id: test.id, ...result, errors });
      console.log(JSON.stringify(results.at(-1)));
    } catch (error) {
      results.push({ id: test.id, n, error: String(error), errors });
      console.error(JSON.stringify(results.at(-1)));
    }
    await page.close();
  }
}

await browser.close();
server.close();

fs.mkdirSync(path.join(root, 'results'), { recursive: true });
fs.writeFileSync(path.join(root, 'results/latest.json'), JSON.stringify({
  generatedAt: new Date().toISOString(),
  environment: 'GitHub Actions / headless Chromium; software/virtual GPU; use relative results only',
  results,
}, null, 2));

const rows = results.map(r => {
  if (r.error) return `| ${r.id} | ${r.n} | ERROR | | | | ${r.error.replaceAll('|', '/')} |`;
  return `| ${r.id} | ${r.n} | ${r.fps} | ${r.ms} | ${r.p95} | ${r.over20ms}% | ${r.errors.join('; ').replaceAll('|', '/')} |`;
});
const md = `# Latest game-library benchmark

Generated: ${new Date().toISOString()}

Environment: GitHub Actions, headless Chromium. Absolute performance is **not** representative of an Android phone; compare relative behavior and where each engine starts missing frame budget.

| engine | objects | fps | avg frame ms | p95 ms | frames >20ms | errors |
|---|---:|---:|---:|---:|---:|---|
${rows.join('\n')}
`;
fs.writeFileSync(path.join(root, 'results/latest.md'), md);
console.log('\n' + md);
