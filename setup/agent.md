# Install short local AI instructions

## Goal

Install **only** [bootstrap/AGENTS.md](../bootstrap/AGENTS.md), not the whole handbook. Its link routes every later task to the current online instructions.

## Supported locations

For **new projects**, place the exact starter text in `PROJECT/AGENTS.md` and open that folder in the editor. Include the file in Git if it suits the project. Do not overwrite an existing AGENTS.md or conflict with a project's CLAUDE.md / .github/copilot-instructions.md.

For **across-project use**, use the agent's **user-level custom instructions** instead of duplicating a file in every project. In VS Code, select the actual agent harness and open **Chat: Open Customizations** to configure user instructions; each harness has different paths. GitHub Copilot CLI supports `~/.copilot/copilot-instructions.md`. Other agents require their own documented location. For VS Code Local agent, check the `chat.useAgentsMdFile` setting for project files.

Official instructions: https://code.visualstudio.com/docs/agent-customization/custom-instructions and https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions

## Setup test

1. Identify the editor and agent. Inspect existing instructions first; never replace them blindly.
2. Copy only the tiny starter into **one** supported scope, using normal file editing (not `curl | sh`).
3. Reopen the agent/chat and verify that it recognizes the handbook URL.
4. Ask `日本語でお願いします` and then `Please answer in English`; confirm both responses and return to the student's preferred language.
5. Ask for a harmless coding task; confirm the agent fetches the live router and the appropriate linked recipe.
6. If web access is unavailable, tell the student current guidance cannot be retrieved. A URL is not automatic sync, and some chat agents will not load local project files.

Finish the complete edit/publish test in [first-project.md](first-project.md).
