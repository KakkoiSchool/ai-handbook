# Kakkoi School Code

The **single entry point** for coding AIs helping Kakkoi School students. One URL, one task; the AI routes itself. Keep only a tiny agent instruction on the student's computer. The detailed instructions remain online and evolve centrally.

## One-sentence student prompts

Setup: **Read https://github.com/KakkoiSchool/ai-handbook and set up this computer for Kakkoi School.**

Later work: **Follow https://github.com/KakkoiSchool/ai-handbook and help with my project.**

## How it works

```text
One-sentence prompt → online AGENTS.md (task router)
                              ↓
                  relevant setup/recipe/upstream docs
                              ↑
                   short local AGENTS.md
```

The agent starts at [AGENTS.md](AGENTS.md), reads existing project instructions, and follows the relevant [setup](setup/README.md), [GitHub recipes](recipes/README.md), or [game guidance](recipes/games.md). It installs just [bootstrap/AGENTS.md](bootstrap/AGENTS.md) following [setup/agent.md](setup/agent.md), to find the latest guidance again for later requests. [Interaction and language-switch behavior](references/agent-behavior.md) lives centrally.

For new games, use [official LittleJS-AI](https://github.com/KilledByAPixel/LittleJS-AI); for Kakkoi multiplayer, use [p2p-core](https://github.com/KakkoiDev/p2p-core). Don't duplicate upstream documentation or add unnecessary wrappers.

For project features, the handbook routes to [Cloudflare DNS and Workers](recipes/cloudflare.md), [email delivery](recipes/email.md), and [AI features](recipes/ai-features.md). Each recipe links to a working project or upstream guide.

To publish a browser or downloadable game on itch.io, use the [itch.io release guide](recipes/itch-io.md).

## Direct skills

Students can use short command-like requests for common workflows:

```text
/ai-guild I want to make a game about Izumo
/serve my-game
/publish my-game
```

Use `/ai-guild` to talk through an idea or choose your next step. If your coding assistant has no custom slash commands, type **Help me in AI Guild mode**. You can [make this guidance the default](setup/agent.md#optional-always-on-ai-guild-guidance) for a project or for your coding assistant.

The router will load the matching instructions from [skills/](skills/README.md). Agents should also offer to turn a newly discovered repeatable workflow into a skill after it succeeds, so students learn that repeated work can be automated without needing to design that optimization themselves.

An agent with no network/repository access cannot automatically fetch the latest instructions and must disclose that limitation.

Run `make validate` for static checks; see [evals/README.md](evals/README.md) for manual agent tests.
