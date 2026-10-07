import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
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
const base = 'http://127.0.0.1:' + port;

const browser = await chromium.launch({
  headless: true,
  args: [
    '--disable-gpu-vsync',
    '--disable-frame-rate-limit',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
  ],
});

const suites = [
  {
    name: 'movement',
    counts: [100, 500, 1000, 5000],
    cases: [
      { id: 'kaplay', page: 'kaplay.html' },
      { id: 'kaplay-area', page: 'kaplay.html', query: '&area=1' },
      { id: 'kontra', page: 'kontra.html' },
      { id: 'littlejs', page: 'littlejs.html' },
      { id: 'phaser', page: 'phaser.html' },
    ],
  },
  {
    name: 'collision',
    counts: [100, 250, 500, 1000],
    cases: [
      { id: 'kaplay-default', page: 'kaplay.html', query: '&mode=collision' },
      { id: 'kaplay-box', page: 'kaplay.html', query: '&mode=collision&narrow=box' },
      { id: 'kaplay-quadtree-box', page: 'kaplay.html', query: '&mode=collision&broad=quadtree&narrow=box' },
      { id: 'kaplay-grid-box', page: 'kaplay.html', query: '&mode=collision&broad=grid&narrow=box&grid=32' },
      { id: 'kontra', page: 'kontra.html', query: '&mode=collision' },
      { id: 'littlejs', page: 'littlejs.html', query: '&mode=collision' },
      { id: 'phaser', page: 'phaser.html', query: '&mode=collision' },
    ],
  },
  {
    name: 'fps262626-style',
    counts: [5],
    cases: [
      { id: 'raw-canvas', page: 'fps-canvas.html' },
      { id: 'kontra', page: 'fps-kontra.html' },
      { id: 'kaplay', page: 'fps-kaplay.html' },
      { id: 'littlejs', page: 'fps-littlejs.html' },
      { id: 'phaser', page: 'fps-phaser.html' },
    ],
  },
];

const results = [];
for (const suite of suites) {
  for (const test of suite.cases) {
    for (const n of suite.counts) {
      const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
      const errors = [];
      page.on('pageerror', e => errors.push(String(e.message || e)));
      page.on('console', m => {
        if (m.type() === 'error') errors.push(m.text());
      });

      const url = base + '/' + test.page + '?n=' + n + (test.query || '');
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      try {
        const started = Date.now();
        let result = null;
        while (!result && Date.now() - started < 45000) {
          if (errors.length) throw new Error(errors[0]);
          await page.waitForTimeout(250);
          result = await page.evaluate(() => window.benchResult || null);
        }
        if (!result) throw new Error('benchmark did not produce a result within 45 seconds');
        results.push({ suite: suite.name, id: test.id, ...result, errors });
        console.log(JSON.stringify(results.at(-1)));
      } catch (error) {
        results.push({ suite: suite.name, id: test.id, n, error: String(error), errors });
        console.error(JSON.stringify(results.at(-1)));
      }
      await page.close();
    }
  }
}

// Measure the preserved original vibe-coded game without modifying its source.
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e.message || e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.addInitScript(() => localStorage.setItem('fps_sound_muted', 'true'));
  await page.goto(base + '/reference/fps262626/index.html', { waitUntil: 'domcontentloaded' });
  await page.locator('#btn-start-game').click();

  const result = await page.evaluate(async () => {
    const warmup = 60;
    const target = 240;
    let frames = 0;
    let measured = 0;
    let start = 0;
    let last = 0;
    const intervals = [];

    return await new Promise(resolve => {
      const sample = (now) => {
        frames++;
        if (frames <= warmup) {
          last = now;
          requestAnimationFrame(sample);
          return;
        }
        if (!start) {
          start = now;
          last = now;
          requestAnimationFrame(sample);
          return;
        }

        intervals.push(now - last);
        last = now;
        measured++;

        if (measured < target) {
          requestAnimationFrame(sample);
          return;
        }

        const duration = now - start;
        const sorted = [...intervals].sort((a,b) => a-b);
        const at = p => sorted[Math.min(sorted.length-1, Math.floor(sorted.length*p))];

        resolve({
          engine: 'FPS262626 original vibe-coded game',
          n: 5,
          frames: measured,
          ms: +(duration / measured).toFixed(2),
          fps: +(1000 * measured / duration).toFixed(1),
          p50: +at(.50).toFixed(2),
          p95: +at(.95).toFixed(2),
          over20ms: +(100 * intervals.filter(v => v > 20).length / intervals.length).toFixed(1),
        });
      };
      requestAnimationFrame(sample);
    });
  });

  results.push({ suite: 'fps262626-original', id: 'original-vibe-coded', ...result, errors });
  console.log(JSON.stringify(results.at(-1)));
  await page.close();
}

await browser.close();
server.close();

const sizeEntries = [
  ['KAPLAY 4000', 'node_modules/kaplay/dist/kaplay.mjs'],
  ['Kontra 10.0.2', 'node_modules/kontra/kontra.mjs'],
  ['LittleJS 1.25.0', 'node_modules/littlejsengine/dist/littlejs.esm.min.js'],
  ['Phaser 4.2.1', 'node_modules/phaser/dist/phaser.esm.js'],
];
const sizes = [];
for (const entry of sizeEntries) {
  const data = fs.readFileSync(path.join(root, entry[1]));
  sizes.push({
    name: entry[0],
    file: entry[1],
    bytes: data.length,
    gzip: zlib.gzipSync(data, { level: 9 }).length,
  });
}

fs.mkdirSync(path.join(root, 'results'), { recursive: true });
fs.writeFileSync(path.join(root, 'results/latest.json'), JSON.stringify({
  generatedAt: new Date().toISOString(),
  environment: 'GitHub Actions / headless Chromium; software/virtual GPU; use relative results only',
  results,
  sizes,
}, null, 2));

function tableFor(name) {
  const rows = results.filter(r => r.suite === name).map(r => {
    if (r.error) return '| ' + r.id + ' | ' + r.n + ' | ERROR | | | | ' + r.error.replaceAll('|', '/') + ' |';
    return '| ' + r.id + ' | ' + r.n + ' | ' + r.fps + ' | ' + r.ms + ' | ' + r.p95 + ' | ' + r.over20ms + '% | ' + r.errors.join('; ').replaceAll('|', '/') + ' |';
  });
  return [
    '## ' + name,
    '',
    '| engine | objects | fps | avg frame ms | p95 ms | frames >20ms | errors |',
    '|---|---:|---:|---:|---:|---:|---|',
    ...rows,
    '',
  ].join('\n');
}

function kib(n) { return (n / 1024).toFixed(1); }
const sizeRows = sizes.map(r =>
  '| ' + r.name + ' | ' + kib(r.bytes) + ' | ' + kib(r.gzip) + ' | ' + r.file + ' |'
);

const md = [
  '# Latest game-library benchmark',
  '',
  'Generated: ' + new Date().toISOString(),
  '',
  'Environment: GitHub Actions, headless Chromium. Absolute performance is not representative of an Android phone. Use this run for relative scaling and frame-budget regressions.',
  '',
  tableFor('movement'),
  tableFor('collision'),
  tableFor('fps262626-style'),
  tableFor('fps262626-original'),
  '## Browser entry size',
  '',
  'These are shipped browser entry files, not tree-shaken application bundles.',
  '',
  '| library | raw KiB | gzip KiB | entry |',
  '|---|---:|---:|---|',
  ...sizeRows,
  '',
  '## Reading the results',
  '',
  '- KAPLAY collision uses area + body with mover/mover collisions ignored.',
  '- Kontra collision uses its Quadtree + collides helpers against static walls.',
  '- LittleJS collision uses EngineObject setCollision and its built-in broadphase/physics.',
  '- Phaser collision uses Arcade Physics dynamic/static groups.',
  '- LittleJS normally targets a fixed 60 Hz update architecture, so uncapped FPS is not directly comparable below its saturation point.',
  '- The FPS262626 original case is the untouched student game snapshot; Playwright measures its requestAnimationFrame cadence externally.',
  '- The FPS262626-style ports keep the same 1280x720 target/particle/tracer/text/background workload and use each framework\'s normal drawing loop.',
  '',
].join('\n');

fs.writeFileSync(path.join(root, 'results/latest.md'), md);
console.log('\n' + md);
