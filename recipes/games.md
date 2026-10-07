# Browser games

## Goal

Help a Kakkoi School student create or modify a browser game without inventing a new game stack.

## Kakkoi School standard

For new browser games, use **LittleJS**.

The official AI-assisted LittleJS toolkit is the game-development handbook:

https://github.com/KilledByAPixel/LittleJS-AI

Before writing the game, read that repository and follow its instructions.

In particular, use its:

- `AGENTS.md` for project conventions;
- `skills/new-littlejs-game/SKILL.md` for new-game scaffolding;
- `skills/littlejs-conventions/SKILL.md` for engine rules and pitfalls;
- `skills/littlejs-api/SKILL.md` when an exact API signature is needed;
- templates and helper modules when the requested feature already exists.

Do **not** reproduce or maintain a second LittleJS manual in this repository. Upstream LittleJS-AI is the source of truth.

## Prompt to follow

A student can tell their coding AI:

```text
Read https://github.com/KilledByAPixel/LittleJS-AI first.

Build this browser game with LittleJS and follow the repository's AGENTS.md,
skills, templates, helpers, and API reference.

Use LittleJS built-ins, official plugins, and LittleJS-AI helpers before
writing replacement systems yourself.
```

Then describe the game.

## Existing projects

If the project already uses another game framework, preserve it unless the student explicitly asks to migrate.

If the student explicitly requests Phaser, raw Canvas, Godot, or another engine, respect that request.

## Multiplayer

LittleJS remains the game engine.

For networking, additionally follow [multiplayer.md](multiplayer.md) and use Kakkoi's `p2p-core` rather than replacing LittleJS or hand-writing a new network layer.

## Verify

Before saying the game works:

1. run/open it using the workflow recommended by LittleJS-AI;
2. confirm the game actually renders;
3. test the requested controls and core loop;
4. check the browser console for errors;
5. if publishing, follow [github-pages.md](github-pages.md) and verify the public URL.

## Do not

- Do not create a Kakkoi-specific wrapper around LittleJS without a demonstrated need.
- Do not hand-roll systems that LittleJS or LittleJS-AI already provides.
- Do not switch to Phaser merely because it benchmarked faster on one device.
- Do not copy LittleJS-AI documentation into this repo; link to and follow upstream.
