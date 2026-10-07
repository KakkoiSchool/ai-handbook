import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

const phaserPage = [
  '<!doctype html>',
  '<meta charset="utf-8">',
  '<title>Phaser benchmark</title>',
  '<style>html,body{margin:0;overflow:hidden;background:#111}canvas{display:block}</style>',
  '<script type="module">',
  "import Phaser from './node_modules/phaser/dist/phaser.esm.js';",
  "import { W, H, SIZE, position, velocity, createMeter } from './common.js';",
  "const q = new URLSearchParams(location.search);",
  "const mode = q.get('mode') || 'movement';",
  "const n = Math.max(1, Math.min(10000, Number(q.get('n')) || 500));",
  "const tick = createMeter(mode === 'collision' ? 'Phaser 4 Arcade collision' : 'Phaser 4', n);",
  "function walls() {",
  "  const t = 16;",
  "  const a = [{x:0,y:0,w:W,h:t},{x:0,y:H-t,w:W,h:t},{x:0,y:0,w:t,h:H},{x:W-t,y:0,w:t,h:H}];",
  "  for (let row=0; row<4; row++) {",
  "    const y = 90 + row * 120;",
  "    for (let col=0; col<4; col++) {",
  "      const x = 100 + col * 170 + (row % 2) * 35;",
  "      a.push((row+col)%2===0 ? {x,y,w:72,h:18} : {x,y,w:18,h:72});",
  "    }",
  "  }",
  "  return a;",
  "}",
  "new Phaser.Game({",
  "  type: Phaser.WEBGL, width: W, height: H, backgroundColor: '#141820',",
  "  pixelArt: true, antialias: false, fps: { target: 1000, smoothStep: false },",
  "  physics: { default: 'arcade', arcade: { gravity: {x:0,y:0}, debug:false } },",
  "  scene: {",
  "    create() {",
  "      if (mode === 'collision') {",
  "        const movers = this.physics.add.group();",
  "        const statics = this.physics.add.staticGroup();",
  "        for (const r of walls()) {",
  "          const o = this.add.rectangle(r.x+r.w/2, r.y+r.h/2, r.w, r.h, 0x5a6270);",
  "          this.physics.add.existing(o, true);",
  "          statics.add(o);",
  "        }",
  "        const s = 12;",
  "        for (let i=0; i<n; i++) {",
  "          const base = position(i), v = velocity(i);",
  "          const x = 24 + (base.x % (W - 48 - s));",
  "          const y = 24 + (base.y % (H - 48 - s));",
  "          const o = this.add.rectangle(x+s/2, y+s/2, s, s, 0x5ab4f0);",
  "          this.physics.add.existing(o);",
  "          o.body.setVelocity(v.x*60, v.y*60);",
  "          o.body.setBounce(1,1);",
  "          movers.add(o);",
  "        }",
  "        this.physics.add.collider(movers, statics);",
  "      } else {",
  "        this.objects = []; this.speeds = [];",
  "        for (let i=0; i<n; i++) {",
  "          const p = position(i), v = velocity(i);",
  "          this.objects.push(this.add.rectangle(p.x,p.y,SIZE,SIZE,0x5ab4f0).setOrigin(0,0));",
  "          this.speeds.push({x:v.x*60,y:v.y*60});",
  "        }",
  "      }",
  "      this.game.events.on(Phaser.Core.Events.POST_RENDER, tick);",
  "    },",
  "    update(_time, delta) {",
  "      if (mode === 'collision') return;",
  "      const dt = Math.min(delta,50)/1000;",
  "      for (let i=0; i<this.objects.length; i++) {",
  "        const o=this.objects[i], v=this.speeds[i];",
  "        o.x += v.x*dt; o.y += v.y*dt;",
  "        if(o.x<0){o.x=0;v.x=Math.abs(v.x)} else if(o.x>W-SIZE){o.x=W-SIZE;v.x=-Math.abs(v.x)}",
  "        if(o.y<0){o.y=0;v.y=Math.abs(v.y)} else if(o.y>H-SIZE){o.y=H-SIZE;v.y=-Math.abs(v.y)}",
  "      }",
  "    }",
  "  }",
  "});",
  '</script>',
].join('\n');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname === '/phaser.html') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(phaserPage);
    return;
  }
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
    counts: [100, 500, 1000, 2500],
    cases: [
      { id: 'kaplay', page: 'kaplay.html', query: '&mode=collision' },
      { id: 'kontra', page: 'kontra.html', query: '&mode=collision' },
      { id: 'littlejs', page: 'littlejs.html', query: '&mode=collision' },
      { id: 'phaser', page: 'phaser.html', query: '&mode=collision' },
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
  '',
].join('\n');

fs.writeFileSync(path.join(root, 'results/latest.md'), md);
console.log('\n' + md);
