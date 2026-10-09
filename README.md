# Kakkoi School Code

The **single entry point** for coding AIs helping Kakkoi School students. One URL, one task; the AI routes itself. Keep only a tiny agent instruction on the student's computer. The detailed instructions remain online and evolve centrally.

## One-sentence student prompts

Setup: **Read https://github.com/KakkoiSchool/ai-handbook and set up this computer for Kakkoi School.**

Later work: **Follow https://github.com/KakkoiSchool/ai-handbook and help with my project.**

Common shortcuts:

- `/serve my-project` — run it locally and verify it
- `/publish my-project` — push and publish it, then verify the public URL

The detailed behavior of these shortcuts lives in [skills/](skills/README.md).

## How it works

```text
One-sentence prompt → online AGENTS.md (task router)
                              ↓
                  relevant setup/recipe/upstream docs
                              ↑
                   short local AGENTS.md
```

The agent starts at [AGENTS.md](AGENTS.md), reads existing project instructions, and routes itself to the relevant [skills](skills/README.md), [setup](setup/README.md), [GitHub recipes](recipes/README.md), or [game guidance](recipes/games.md). It installs just [bootstrap/AGENTS.md](bootstrap/AGENTS.md) following [setup/agent.md](setup/agent.md), to find the latest guidance again for later requests. [Interaction and language-switch behavior](references/agent-behavior.md) lives centrally.

For new games, use [official LittleJS-AI](https://github.com/KilledByAPixel/LittleJS-AI); for Kakkoi multiplayer, use [p2p-core](https://github.com/KakkoiDev/p2p-core). Don't duplicate upstream documentation or add unnecessary wrappers.

## Direct skills

Students can use short command-like requests for common workflows:

```text
/serve my-game
/publish my-game
```

The router will load the matching instructions from [skills/](skills/README.md). Agents should also offer to turn a newly discovered repeatable workflow into a skill after it succeeds, so students learn that repeated work can be automated without needing to design that optimization themselves.

An agent with no network/repository access cannot automatically fetch the latest instructions and must disclose that limitation.

Run `make validate` for static checks; see [evals/README.md](evals/README.md) for manual agent tests.
