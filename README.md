# Kakkoi School AI Handbook

A small operational handbook for AI assistants helping Kakkoi School students.

The student should be able to say:

> Read https://github.com/KakkoiSchool/ai-handbook and follow it to help me create and publish my project.

The handbook is intentionally prescriptive. **Do not guess the workflow when a recipe exists.**

## For AI assistants

1. Read [`AGENTS.md`](AGENTS.md).
2. Identify the student's task.
3. Open the matching file in [`recipes/`](recipes/README.md).
4. Use the capability ladder in order.
5. Verify the result before saying it worked.
6. If a permission or tool is missing, say exactly what is blocked and use the next documented fallback.

## Capability ladder

Use the first available option:

1. **Native GitHub API / connected GitHub tool** — best when your environment already exposes GitHub actions.
2. **GitHub CLI (`gh`)** — preferred from a student's terminal.
3. **`git`** — for local history, branches, remotes, commits and pushes.
4. **Browser fallback** — manual GitHub UI or the safe Playwright helpers in [`browser/`](browser/README.md).

Never invent a fifth path just because you remember another framework or service.

## New student / blank computer

If the student is starting with almost nothing installed, use the complete first-day path:

- [`setup/README.md`](setup/README.md) — GitHub account → Git → GitHub CLI → VS Code → GitHub/Copilot → Live Server → localhost → commit/push → GitHub Pages

## Common tasks

| Student wants to… | Read |
|---|---|
| Set up a new student's computer | [`setup/README.md`](setup/README.md) |
| Create a GitHub account | [`setup/github-account.md`](setup/github-account.md) |
| Install Git | [`setup/git.md`](setup/git.md) |
| Install VS Code | [`setup/vscode.md`](setup/vscode.md) |
| Connect VS Code to GitHub | [`setup/vscode-github.md`](setup/vscode-github.md) |
| Enable Copilot Free / Student | [`setup/copilot.md`](setup/copilot.md) |
| Install/use Live Server | [`setup/live-server.md`](setup/live-server.md) |
| Understand localhost / local servers | [`setup/local-server.md`](setup/local-server.md) |
| Apply for GitHub Education | [`setup/github-education.md`](setup/github-education.md) |
| Install and use GitHub CLI | [`recipes/github-cli.md`](recipes/github-cli.md) |
| Create a local project | [`recipes/create-local-project.md`](recipes/create-local-project.md) |
| Create a GitHub repository | [`recipes/create-repository.md`](recipes/create-repository.md) |
| Create a repository in KakkoiSchool | [`recipes/kakkoischool-repository.md`](recipes/kakkoischool-repository.md) |
| Clone a repository | [`recipes/clone-repository.md`](recipes/clone-repository.md) |
| Connect an existing folder to GitHub | [`recipes/connect-local-repository.md`](recipes/connect-local-repository.md) |
| Commit and push changes | [`recipes/commit-and-push.md`](recipes/commit-and-push.md) |
| Rename a repository | [`recipes/rename-repository.md`](recipes/rename-repository.md) |
| Archive / unarchive a repository | [`recipes/archive-repository.md`](recipes/archive-repository.md) |
| Delete a repository | [`recipes/delete-repository.md`](recipes/delete-repository.md) |
| Change public/private visibility | [`recipes/change-visibility.md`](recipes/change-visibility.md) |
| Fork a repository | [`recipes/fork-repository.md`](recipes/fork-repository.md) |
| Work with branches | [`recipes/branches.md`](recipes/branches.md) |
| Open a pull request | [`recipes/pull-request.md`](recipes/pull-request.md) |
| Merge a pull request | [`recipes/merge-pull-request.md`](recipes/merge-pull-request.md) |
| Create or close issues | [`recipes/issues.md`](recipes/issues.md) |
| Create a release | [`recipes/releases.md`](recipes/releases.md) |
| Add/remove collaborators | [`recipes/collaborators.md`](recipes/collaborators.md) |
| Publish with GitHub Pages | [`recipes/github-pages.md`](recipes/github-pages.md) |
| Move a repository to another owner | [`recipes/transfer-repository.md`](recipes/transfer-repository.md) |
| Add multiplayer to a browser project | [`recipes/multiplayer.md`](recipes/multiplayer.md) |
| Use a browser when CLI/API is unavailable | [`recipes/browser-fallback.md`](recipes/browser-fallback.md) |

## For students

You do not need to read all of this repository. Give its URL to your AI and describe what you want.

日本語でも大丈夫です。例えば：

> このURLの手順を読んで、私のゲームをGitHub Pagesで公開するのを手伝ってください。

The AI should then open the matching recipe and follow it.
