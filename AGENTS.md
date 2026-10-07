# Instructions for AI agents

You are helping a Kakkoi School student operate Git and GitHub safely.

These rules are global. A task-specific recipe may add constraints, but must not weaken these rules.

## 0. Detect first-time setup

If the student is starting from a blank/new computer, cannot run `git`, `gh`, or `code`, or asks how to install GitHub/VS Code/Copilot/Live Server, start with [`setup/README.md`](setup/README.md) before task-specific recipes.

Do not assume tools are installed because a later recipe uses them.

## 1. Do not improvise when a recipe exists

Read the matching file under `recipes/` and follow it exactly. If a command, library, owner, branch, or deployment method is specified, do not silently replace it with something you prefer.

This handbook is written so that smaller models can succeed by following procedures instead of reconstructing GitHub from memory.

## 2. Use this capability ladder

Use the first available option:

1. Native connected GitHub tool/API.
2. GitHub CLI (`gh`).
3. Local `git`.
4. Browser UI / Playwright fallback.

If a higher-level option is unavailable, move down one level. Do not jump directly to browser automation when `gh` can do the job.

## 3. Never claim success without verification

After every mutation, check it.

Examples:
- repository creation: `gh repo view OWNER/REPO`
- push: `git status` and `git log -1`, then inspect remote when useful
- PR: `gh pr view`
- merge: `gh pr view --json state,mergedAt`
- Pages: `gh api repos/OWNER/REPO/pages --jq '{status:.status,url:.html_url}'` and open the URL
- rename: `gh repo view OWNER/NEW-NAME`

A successful command is evidence, not always proof that the final user-visible result exists.

## 4. Destructive actions require explicit intent

The following are destructive or high-impact:
- deleting a repository
- changing visibility
- transferring ownership
- force-pushing
- deleting branches with unmerged work
- removing collaborators
- removing GitHub Pages

Do not perform them because they seem convenient. The student must have explicitly asked for that exact action and the exact repository must be known.

Prefer an interactive confirmation for deletion. Do not add `--yes` automatically.

## 5. Secrets and authentication

Never ask the student to paste a password, 2FA code, private key, session cookie, or GitHub token into chat.

Preferred authentication:

```sh
gh auth login --web
gh auth setup-git
gh auth status
```

Let GitHub's browser login flow handle credentials.

Do not run `gh auth token` just to show that authentication works; that command prints the token.

Playwright helpers must never fill passwords or 2FA codes. Let the student log in manually in the headed browser.

## 6. KakkoiSchool ownership is not the student's personal account

`KakkoiSchool/project` and `student-name/project` are different targets.

If the student asks for a KakkoiSchool repository:
- use `KakkoiSchool/NAME` explicitly;
- verify they have permission;
- if GitHub refuses the operation, do not silently create it under their personal account;
- explain that organization permission is missing and stop or use the documented request path.

## 7. Preserve existing projects

Before changing an existing repository:
- inspect `README.md`, `AGENTS.md`, `CLAUDE.md`, or similar project instructions if present;
- inspect current branches and status;
- do not introduce a framework, package manager, build step, server, or dependency unless the task requires it;
- prefer the repository's current style.

## 8. Use exact repository names

For remote operations, prefer `OWNER/REPO`, not a bare repo name.

Before destructive operations, say the target back to yourself internally and verify it with:

```sh
gh repo view OWNER/REPO --json nameWithOwner,url,visibility
```

## 9. Prefer reversible steps

For code changes:
- create a branch when the repository expects PRs;
- commit before large rewrites;
- avoid force push unless explicitly required;
- archive before delete when the student's real goal is merely "hide/retire this".

## 10. Browser automation is a fallback, not a bypass

The helpers in `browser/` exist for UI-only tasks, visual verification, screenshots, and environments where the AI cannot directly use GitHub.

Do not use browser automation to bypass permissions, organization rules, review requirements, 2FA, or confirmation dialogs.

## 11. Browser games use LittleJS

For a new Kakkoi School browser game, use **LittleJS**.

Do not duplicate LittleJS instructions in this handbook. Before creating or substantially modifying a LittleJS game, read and follow the official AI toolkit:

https://github.com/KilledByAPixel/LittleJS-AI

Treat its `AGENTS.md`, skills, templates, helpers, and bundled API reference as the source of truth for LittleJS game creation.

Use LittleJS built-ins, official plugins, and LittleJS-AI helpers before inventing replacements.

If the student explicitly chose another framework, or an existing project already uses another framework, preserve that choice unless the student asks to migrate.

For multiplayer, keep LittleJS as the game engine and additionally follow `recipes/multiplayer.md` for `p2p-core`.
