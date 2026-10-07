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
  // deterministic values, avoiding random benchmark-to-benchmark differences
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

export function createMeter(engine, n, extra = {}) {
  let frames = 0;
  let measured = 0;
  let start = 0;
  let last = 0;
  const intervals = [];
  const warmup = 60;
  const target = 240;

  return function tick() {
    const now = performance.now();
    frames++;

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
