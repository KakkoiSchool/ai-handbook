# Install short local AI instructions

## Goal

For standard setup, install [bootstrap/AGENTS.md](../bootstrap/AGENTS.md). Its link routes later tasks to the current online handbook. The optional AI Guild guidance below adds a short block at the student's chosen scope.

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

## Optional always-on AI Guild guidance

Offer this when a student asks for it, or after their first useful [`/ai-guild` session](../skills/ai-guild/SKILL.md). Let the student choose on-demand use, this project, or all projects in their current coding assistant. After they explicitly choose a persistent scope, append the following block once to the instructions supported at that scope. Check any existing instructions first and preserve them. When the starter already contains the handbook URL, reuse that link.

> If the student is unsure, ask one useful question or offer two concrete options and let them choose. Start directly on clear tasks.  
> Before acting, check the current AI Handbook router (https://github.com/KakkoiSchool/ai-handbook/blob/main/AGENTS.md) and open only the guidance needed for the next step.  
> Show the student how to try the result.

Keep the rest of the skill online. Open a fresh chat in the chosen scope and check that one vague idea gets a focused question and one clear task gets its matching recipe. Tell the student where the block was added so they can remove it if they return to on-demand use.
