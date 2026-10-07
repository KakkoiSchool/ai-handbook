export const FW = 1280;
export const FH = 720;

const TYPES = [
  { color:'#00f0ff', radius:38, speed:1.8, duration:3.5 },
  { color:'#ffd700', radius:26, speed:3.4, duration:2.8 },
  { color:'#ff0055', radius:20, speed:4.8, duration:2.2 },
];

export function makeFPSState() {
  const targets = Array.from({length:5}, (_,i) => {
    const type = TYPES[i % TYPES.length];
    const angle = i * 1.23 + .4;
    return {
      type,
      x: 180 + (i * 211) % 900,
      y: 120 + (i * 97) % 430,
      vx: Math.cos(angle) * type.speed,
      vy: Math.sin(angle) * type.speed,
      lifeTime: type.duration,
      maxLifeTime: type.duration,
      alpha: 1,
      scale: 1,
      ringRotation: i * .7,
    };
  });

  const particles = Array.from({length:90}, (_,i) => {
    const angle = (i / 90) * Math.PI * 2;
    const speed = 2 + (i % 7);
    return {
      x: 640 + Math.cos(angle) * (30 + i % 80),
      y: 360 + Math.sin(angle) * (30 + i % 80),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 2 + (i % 4),
      alpha: 1 - (i % 20) / 24,
      decay: .015 + (i % 5) * .006,
      color: TYPES[i % 3].color,
    };
  });

  const floatingTexts = Array.from({length:5}, (_,i) => ({
    text: i % 2 ? '+200' : 'CRITICAL! +400',
    x: 260 + i * 180,
    y: 170 + (i % 3) * 90,
    color: i % 2 ? '#00f0ff' : '#ff0055',
    alpha: 1 - i * .12,
    vy: -1.8,
    big: i % 2 === 0,
  }));

  const tracers = Array.from({length:5}, (_,i) => ({
    startX: 740,
    startY: FH,
    endX: 240 + i * 180,
    endY: 160 + (i % 3) * 120,
    alpha: .8 - i * .08,
  }));

  return {
    targets,
    particles,
    floatingTexts,
    tracers,
    crosshair:{x:640,y:330,phase:0},
    muzzleFlash:1,
    screenShake:4,
    effectClock:0,
  };
}

export function stepFPS(s, dt) {
  const frame = Math.min(3, dt * 60);
  s.effectClock += dt;

  for (const t of s.targets) {
    t.x += t.vx * frame;
    t.y += t.vy * frame;
    const margin = 60;
    if (t.x - t.type.radius < margin) { t.x = margin + t.type.radius; t.vx *= -1; }
    else if (t.x + t.type.radius > FW - margin) { t.x = FW - margin - t.type.radius; t.vx *= -1; }
    if (t.y - t.type.radius < margin) { t.y = margin + t.type.radius; t.vy *= -1; }
    else if (t.y + t.type.radius > FH - margin - 50) { t.y = FH - margin - 50 - t.type.radius; t.vy *= -1; }
    t.ringRotation += .03 * frame;
    t.lifeTime -= dt;
    if (t.lifeTime <= 0) t.lifeTime = t.maxLifeTime;
    t.alpha = Math.min(1, (t.lifeTime / t.maxLifeTime) * 1.5);
  }

  for (const p of s.particles) {
    p.x += p.vx * frame;
    p.y += p.vy * frame;
    const damp = Math.pow(.94, frame);
    p.vx *= damp;
    p.vy *= damp;
    p.alpha -= p.decay * frame;
    if (p.alpha <= 0) {
      p.x = 640; p.y = 360; p.alpha = 1;
      p.vx = ((p.size * 17) % 9) - 4;
      p.vy = -2 - (p.size % 5);
    }
  }

  for (const t of s.floatingTexts) {
    t.y += t.vy * frame;
    t.alpha -= .02 * frame;
    if (t.alpha <= 0) { t.alpha = 1; t.y = 360; }
  }

  for (const tr of s.tracers) {
    tr.alpha -= .12 * frame;
    if (tr.alpha <= 0) tr.alpha = .8;
  }

  s.crosshair.phase += dt;
  s.crosshair.x = 640 + Math.cos(s.crosshair.phase * 1.7) * 180;
  s.crosshair.y = 320 + Math.sin(s.crosshair.phase * 1.3) * 110;
  s.muzzleFlash -= dt * 8;
  if (s.muzzleFlash <= 0 && (s.effectClock % .8) < dt) s.muzzleFlash = 1;
  s.screenShake = Math.max(0, s.screenShake - dt * 25);
  if ((s.effectClock % 1.1) < dt) s.screenShake = 4;
}
