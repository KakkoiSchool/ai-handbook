# Browser game library benchmark

A reproducible benchmark for libraries considered as Kakkoi School's default 2D browser-game layer.

Pinned versions:

- KAPLAY `4000.0.0-alpha.27.1`
- Kontra `10.0.2`
- LittleJS `1.25.0`
- Phaser `4.2.1`

## Why these four

The school needs more than the fastest renderer. The default should also be:

- simple enough for beginners;
- predictable for weaker coding models;
- usable without a heavy build system;
- fast enough on ordinary phones;
- capable of collision, input, scenes, sound, and common 2D game patterns.

Phaser is included as the mainstream/full-engine control. KAPLAY is the leading beginner/API candidate. Kontra represents the thin/minimal end. LittleJS is the compact batteries-included option.

## Suite 1: moving game objects

Classic bunnymark-style workload:

- 800 × 600 canvas
- 100, 500, 1,000 and 5,000 moving objects
- every object moves every frame
- every object performs the same screen-boundary bounce
- 60 warm-up frames
- 240 measured frames

KAPLAY is also run with `area()` attached to every object to expose collision-component baseline overhead.

## Suite 2: collision workload

A more game-like scene:

- 800 × 600
- 20 static walls/obstacles
- 100, 500, 1,000 and 2,500 moving collision bodies
- mover-vs-mover collision is disabled
- movers bounce from static obstacles
- each library uses its idiomatic collision system

Implementations:

- KAPLAY: `area()` + `body()`, static bodies, mover collision ignore
- Kontra: `Quadtree` + `collides()`
- LittleJS: `EngineObject.setCollision()` with built-in broadphase/physics
- Phaser: Arcade Physics dynamic/static groups

This is deliberately not a hand-written collision engine shared by all four. The question is what students actually pay when they use each library's normal tools.

### KAPLAY collision strategy round

KAPLAY 4000 exposes several collision algorithms, so the benchmark also tests whether a beginner-friendly configuration can avoid the poor scaling of its default `sap + gjk` path for axis-aligned games:

- default: `sap + gjk`
- `sap + box`
- `quadtree + box`
- `grid + box` with a 32 px cell

If one of these is consistently better, the school handbook can prescribe it instead of leaving weaker models to use the default blindly.

## Suite 3: browser entry size

The runner records raw and gzip sizes of the browser entry files used for the test. This is not a tree-shaken production bundle, but it shows the default amount of engine code students ask the browser to load.

## Important caveats

GitHub Actions runs headless Chromium with virtual/software graphics. Absolute FPS from CI is **not a low-end Android hardware result**.

The CI suite is useful for:

- relative scaling;
- catching large framework overhead;
- seeing where an engine leaves a 16.7 ms frame budget;
- regression testing future library versions.

A final school default should also be tested on a real lower-end Android browser.

The renderers differ. Kontra's normal path is Canvas2D; the others normally use WebGL. That is part of their real defaults, but it means this is a practical framework comparison, not a renderer microbenchmark.

LittleJS normally uses a fixed 60 Hz architecture, so uncapped FPS values below saturation are not numerically comparable to engines that render as fast as Chromium allows.

## Run locally

```sh
cd benchmarks/game-libs
npm install
npx playwright install chromium
node run.mjs
```

Results are written to:

```text
results/latest.json
results/latest.md
```

The GitHub Actions workflow runs automatically whenever benchmark files change.
