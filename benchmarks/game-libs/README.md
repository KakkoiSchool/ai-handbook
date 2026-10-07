# Browser game library benchmark

A reproducible benchmark for libraries considered as Kakkoi School's default 2D browser-game layer.

Public test lab after the Pages workflow deploys:

https://kakkoischool.github.io/ai-handbook/

Every test page includes a visible live FPS / frame-time overlay, so the same cases CI runs can be opened on a phone or computer.

Pinned versions:

- KAPLAY `4000.0.0-alpha.27.1`
- Kontra `10.0.2`
- LittleJS `1.25.0`
- Phaser `4.2.1`

## Suite 1: moving game objects

800×600 bunnymark-style movement at 100, 500, 1,000 and 5,000 objects.

KAPLAY is also run with `area()` attached to expose baseline collision-component overhead.

## Suite 2: collision workload

20 static walls/obstacles with moving bodies. CI currently runs 100, 250, 500 and 1,000 bodies.

KAPLAY gets several algorithm variants:

- default `sap + gjk`
- `sap + box`
- `quadtree + box`
- `grid + box` with 32px cells

Other normal paths:

- Kontra: `Quadtree + collides()`
- LittleJS: `EngineObject.setCollision()`
- Phaser: Arcade Physics

## Suite 3: FPS262626 real-game workload

The student project that motivated the test is kept as an **untouched reference snapshot**:

`reference/fps262626/`

Source:

https://github.com/fps262626/game-web-FPS

Snapshot commit:

`aa4b65ec65fb956d3c264b490b3c36c965a16563`

CI measures its requestAnimationFrame cadence externally, without editing the original game.

The framework ports copy the important shape of its main loop:

- 1280×720 render surface
- perspective neon grid background
- 5 moving animated targets
- target rings/claws/core/progress decoration
- 90 particles
- floating score text
- 5 tracers
- muzzle-flash overlay
- moving crosshair

Ports:

- raw Canvas baseline
- Kontra
- KAPLAY
- LittleJS
- Phaser 4

The ported workload normalizes movement to elapsed time so uncapped CI does not make the targets move hundreds of times faster than the original's intended ~60Hz visual speed.

## Suite 4: browser entry size

The runner records raw/gzip size of each library's browser entry file.

## Caveats

GitHub Actions runs headless Chromium with virtual/software graphics and frame limiting disabled. CI FPS is useful for relative scaling and frame-budget regressions, **not** as a literal phone FPS prediction.

The public Pages lab is therefore part of the benchmark: run the same pages on actual student hardware and read the live counter.

LittleJS normally targets a fixed 60Hz architecture, so its uncapped number should be interpreted differently from engines that render as fast as Chromium permits.

## Run locally

```sh
cd benchmarks/game-libs
npm install
npx playwright install chromium
node run.mjs
```

Results:

```text
results/latest.json
results/latest.md
```
