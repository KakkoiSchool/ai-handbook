# Kakkoi School Code

This repository is the **single entry point for coding AIs helping Kakkoi School students**.

Students should not need to know which recipe, framework, plugin, or documentation site to use. Give the AI this repository and describe the task. The AI routes itself.

## Student prompt

For a new computer:

> Read https://github.com/KakkoiSchool/ai-handbook and set up this computer for Kakkoi School.

For anything else:

> Read https://github.com/KakkoiSchool/ai-handbook and help me with this project.

That is enough.

## For AI assistants

Read [AGENTS.md](AGENTS.md) first.

It tells you where to go next based on the student's request.

| Student needs | Route |
|---|---|
| First-time computer setup | [setup/README.md](setup/README.md) |
| Make or modify a browser game | [recipes/games.md](recipes/games.md) → official LittleJS-AI |
| Git / GitHub operation | [recipes/README.md](recipes/README.md) |
| Publish a site | [recipes/github-pages.md](recipes/github-pages.md) |
| Multiplayer | [recipes/multiplayer.md](recipes/multiplayer.md) |
| Existing project work | Read that project's own instructions first |

## Principle

This repository is a **router**, not a replacement for upstream documentation.

When an authoritative project already provides AI instructions, use them directly instead of copying them here.

For browser games, Kakkoi School uses LittleJS and the authoritative AI game-development instructions live at:

https://github.com/KilledByAPixel/LittleJS-AI
