export const W = 800;
export const H = 600;
export const SIZE = 8;

export function params() {
  const q = new URLSearchParams(location.search);
  return {
    n: Math.max(1, Math.min(20000, Number(q.get('n')) || 1000)),
    area: q.get('area') === '1',
  };
}

export function velocity(i) {
  return {
    x: ((i * 17) % 7 + 1) * (i % 2 ? 0.31 : -0.31),
    y: ((i * 29) % 5 + 1) * (i % 3 ? 0.27 : -0.27),
  };
}

export function position(i) {
  return {
    x: (i * 47) % (W - SIZE),
    y: (i * 83) % (H - SIZE),
  };
}

function makeHud(engine, n) {
  if (typeof document === 'undefined') return null;
  let hud = document.getElementById('benchmark-live-hud');
  if (!hud) {
    hud = document.createElement('div');
    hud.id = 'benchmark-live-hud';
    Object.assign(hud.style, {
      position: 'fixed',
      top: '10px',
      left: '10px',
      zIndex: '999999',
      minWidth: '210px',
      padding: '10px 12px',
      border: '1px solid rgba(0,240,255,.5)',
      background: 'rgba(2,7,12,.88)',
      color: '#e8ffff',
      font: '12px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace',
      boxShadow: '0 0 24px rgba(0,240,255,.18)',
      pointerEvents: 'none',
      whiteSpace: 'pre',
    });
    document.body.appendChild(hud);
  }
  hud.dataset.engine = engine;
  hud.dataset.objects = String(n);
  return hud;
}

export function createMeter(engine, n, extra = {}) {
  let frames = 0;
  let measured = 0;
  let start = 0;
  let last = 0;
  let liveStart = performance.now();
  let liveFrames = 0;
  const intervals = [];
  const warmup = 60;
  const target = 240;
  const hud = makeHud(engine, n);

  if (hud) hud.textContent = engine + '\nobjects: ' + n + '\nlive FPS: warming up…';

  return function tick() {
    const now = performance.now();
    frames++;
    liveFrames++;

    const liveDuration = now - liveStart;
    if (hud && liveDuration >= 350) {
      const liveFps = 1000 * liveFrames / liveDuration;
      const frameMs = liveDuration / liveFrames;
      hud.textContent =
        engine + '\nobjects: ' + n +
        '\nlive FPS: ' + liveFps.toFixed(1) +
        '\nframe: ' + frameMs.toFixed(2) + ' ms' +
        (window.benchResult
          ? '\nCI sample: ' + window.benchResult.fps + ' FPS / ' + window.benchResult.ms + ' ms'
          : '');
      liveStart = now;
      liveFrames = 0;
    }

    if (frames <= warmup) {
      last = now;
      return;
    }

    if (!start) {
      start = now;
      last = now;
      return;
    }

    intervals.push(now - last);
    last = now;
    measured++;

    if (measured >= target && !window.benchResult) {
      const duration = now - start;
      const sorted = [...intervals].sort((a, b) => a - b);
      const at = (p) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
      window.benchResult = {
        engine,
        n,
        frames: measured,
        ms: +(duration / measured).toFixed(2),
        fps: +(1000 * measured / duration).toFixed(1),
        p50: +at(0.50).toFixed(2),
        p95: +at(0.95).toFixed(2),
        over20ms: +(100 * intervals.filter(v => v > 20).length / intervals.length).toFixed(1),
        ...extra,
      };
      console.log('BENCH_RESULT ' + JSON.stringify(window.benchResult));
    }
  };
}
