# Connect VS Code to GitHub and a repository

## Goal

Open a GitHub repository locally in VS Code and be able to pull, edit, commit, and push.

VS Code has built-in Git support. A separate GitHub extension is **not required** for basic clone/pull/push authentication.

Official guide:
https://code.visualstudio.com/docs/sourcecontrol/github

## Method A: clone from VS Code

1. Open VS Code.
2. Open the Command Palette:
   - macOS: **Cmd+Shift+P**
   - Windows/Linux: **Ctrl+Shift+P**
3. Run **Git: Clone**.
4. Choose **Clone from GitHub**.
5. If prompted, sign in to GitHub in the browser.
6. Choose or paste `OWNER/REPO`.
7. Choose where it should live on the computer.
8. Click **Open** when cloning finishes.

VS Code creates the local Git repository and a remote named `origin`.

## Method B: GitHub CLI

```sh
gh repo clone OWNER/REPO
cd REPO
code .
```

This is often easiest for an AI assistant because the commands are deterministic.

## Verify

Open the integrated terminal:

```sh
git status
git remote -v
gh repo view OWNER/REPO
```

Expected:

- `git status` recognizes a repository;
- `origin` points to the intended GitHub repository;
- GitHub CLI can view the same repository.

## VS Code Source Control

Click the Source Control icon.

Typical flow:

1. edit a file;
2. Source Control shows it under **Changes**;
3. review the diff;
4. stage the intended change;
5. type a commit message;
6. Commit;
7. Sync/Push.

For students, explain the concepts even if using buttons:

```text
working file
   ↓ stage
next commit
   ↓ commit
local history
   ↓ push
GitHub
```

## Pull before editing shared work

When several students may change the same repository:

```sh
git pull --ff-only
```

If Git reports a conflict, stop and inspect it. Do not make a weaker AI solve the conflict by deleting one side.

## Optional GitHub extensions

For basic Git, no GitHub extension is required.

The **GitHub Pull Requests and Issues** extension is useful if the class wants students to create/review PRs and issues inside VS Code.

Install only when needed; do not make it part of the minimal setup.
