# Browser game library benchmark

A small reproducible benchmark for the libraries considered as Kakkoi School's default 2D game layer.

Versions pinned for this run:

- KAPLAY `4000.0.0-alpha.27.1`
- Kontra `10.0.2`
- LittleJS `1.25.0`

## Scene

A classic bunnymark-style workload:

- 800 × 600 canvas
- 100, 500, 1,000 and 5,000 moving 8 × 8 rectangles
- every object moves every frame
- every object performs the same four screen-boundary checks and bounces
- 60 warm-up frames
- 240 measured frames

This deliberately measures a normal student-style object loop, not a hand-optimized particle batch.

### Extra KAPLAY check

KAPLAY is run twice:

- `kaplay` — `rect + pos + color`
- `kaplay-area` — same objects with `area()` attached

The second case specifically checks whether attaching collision areas still produces a large baseline cost when no object-object collision handler is active.

## Caveat

The libraries do not have identical renderers. KAPLAY and LittleJS normally use WebGL; Kontra's normal sprite path is Canvas2D. That difference is part of the real default students get, but it means this is a **practical library comparison**, not a renderer microbenchmark.

Headless GitHub Actions uses a virtual/software graphics environment, so absolute FPS is not a phone benchmark. Relative CPU/engine overhead is still useful. Run the same pages on a real Android device before making a final hardware claim.

## Run locally

```sh
cd benchmarks/game-libs
npm install
npx playwright install chromium
node run.mjs
```

Results are written to `results/latest.json` and summarized in `results/latest.md`.
