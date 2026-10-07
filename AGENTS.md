# Kakkoi School AI Router

You are helping a Kakkoi School student.

This file is a **router**. Do not make the student choose documentation. Determine what they are trying to do, open the matching instructions below, and follow them.

Keep routing flat: **one decision, one jump to the actual instructions**. Do not send the student through an index of indexes.

If a task spans several areas, use only the routes that are actually needed, in the order the work requires.

## Route the task

| Student wants to… | Go directly to… |
|---|---|
| Set up a new/blank computer or start from scratch | [setup/README.md](setup/README.md) |
| Create a GitHub account | [setup/github-account.md](setup/github-account.md) |
| Install/configure Git | [setup/git.md](setup/git.md) |
| Install VS Code | [setup/vscode.md](setup/vscode.md) |
| Connect VS Code to GitHub | [setup/vscode-github.md](setup/vscode-github.md) |
| Set up Copilot | [setup/copilot.md](setup/copilot.md) |
| Apply for GitHub Education | [setup/github-education.md](setup/github-education.md) |
| Install/use Live Server | [setup/live-server.md](setup/live-server.md) |
| Understand localhost/local servers | [setup/local-server.md](setup/local-server.md) |
| Create a first local project | [recipes/create-local-project.md](recipes/create-local-project.md) |
| Install/use GitHub CLI | [recipes/github-cli.md](recipes/github-cli.md) |
| Create a GitHub repository | [recipes/create-repository.md](recipes/create-repository.md) |
| Create a repository in KakkoiSchool | [recipes/kakkoischool-repository.md](recipes/kakkoischool-repository.md) |
| Clone a repository | [recipes/clone-repository.md](recipes/clone-repository.md) |
| Connect an existing folder to GitHub | [recipes/connect-local-repository.md](recipes/connect-local-repository.md) |
| Commit and push changes | [recipes/commit-and-push.md](recipes/commit-and-push.md) |
| Work with branches | [recipes/branches.md](recipes/branches.md) |
| Open a pull request | [recipes/pull-request.md](recipes/pull-request.md) |
| Merge a pull request | [recipes/merge-pull-request.md](recipes/merge-pull-request.md) |
| Create/close issues | [recipes/issues.md](recipes/issues.md) |
| Create a release | [recipes/releases.md](recipes/releases.md) |
| Add/remove collaborators | [recipes/collaborators.md](recipes/collaborators.md) |
| Publish a site with GitHub Pages | [recipes/github-pages.md](recipes/github-pages.md) |
| Rename a repository | [recipes/rename-repository.md](recipes/rename-repository.md) |
| Archive/unarchive a repository | [recipes/archive-repository.md](recipes/archive-repository.md) |
| Delete a repository | [recipes/delete-repository.md](recipes/delete-repository.md) |
| Change repository visibility | [recipes/change-visibility.md](recipes/change-visibility.md) |
| Fork a repository | [recipes/fork-repository.md](recipes/fork-repository.md) |
| Transfer a repository | [recipes/transfer-repository.md](recipes/transfer-repository.md) |
| Make or substantially modify a browser game | **Read and follow the official [LittleJS-AI](https://github.com/KilledByAPixel/LittleJS-AI) repository directly** |
| Add browser multiplayer/networking | **Read and follow [KakkoiDev/p2p-core](https://github.com/KakkoiDev/p2p-core) directly** |
| Use a browser because GitHub API/CLI is unavailable | [recipes/browser-fallback.md](recipes/browser-fallback.md) |

## Existing projects

Before changing an existing project, read that project's own README.md, AGENTS.md, CLAUDE.md, or equivalent instructions.

Preserve its existing stack unless the student explicitly asks to migrate.

For a new Kakkoi School browser game, route to **LittleJS-AI**. Do not invent a Kakkoi-specific game framework.

For a LittleJS game that also needs multiplayer, use both authoritative sources:
1. LittleJS-AI for the game;
2. p2p-core for networking.

## Universal rules

These apply regardless of route:

- Never ask the student to paste passwords, 2FA codes, private keys, session cookies, recovery codes, or GitHub tokens into chat.
- Destructive/high-impact actions require explicit student intent: delete, transfer, visibility change, force-push, unmerged branch deletion, collaborator removal, Pages removal.
- KakkoiSchool ownership and a student's personal account are different targets. Never silently substitute one for the other.
- Verify the final result before claiming success.
- Prefer the documented solution over inventing a parallel framework, service, or workflow.
- If the matched instructions point to an upstream authoritative project, follow that project instead of copying its documentation back into this repository.

## If nothing matches

Do not guess a new Kakkoi standard.

First inspect the current project's own documentation. If no existing route or project instruction covers the task, explain what is missing and use the simplest reversible approach.
