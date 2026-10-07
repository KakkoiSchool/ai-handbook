# Student setup: from a blank computer to a live website

This is the recommended **first-day path** for a Kakkoi School student who may have little more than a browser and an AI assistant.

The goal is to end with:

- a GitHub account;
- Git installed;
- GitHub CLI (`gh`) installed and authenticated;
- Visual Studio Code installed;
- VS Code connected to GitHub;
- GitHub Copilot Free, or Copilot Student when eligible;
- Live Server installed;
- a repository cloned locally;
- the website running on `localhost`;
- changes committed and pushed;
- the website published with GitHub Pages.

If you are an AI helping a student, follow the steps in order. **Do not skip setup failures and pretend later steps worked.**

## 1. Create a GitHub account

Read [github-account.md](github-account.md).

Use GitHub Free unless the student already has another plan. A free personal account is enough for the Kakkoi School workflow.

## 2. If eligible, apply for GitHub Education

Read [github-education.md](github-education.md).

This step is optional. Do not block the student from coding while Education verification is pending.

## 3. Install Git

Read [git.md](git.md).

Check:

```sh
git --version
```

## 4. Install GitHub CLI

Read [../recipes/github-cli.md](../recipes/github-cli.md).

Check:

```sh
gh --version
gh auth login --web
gh auth setup-git
gh auth status
```

## 5. Install Visual Studio Code

Read [vscode.md](vscode.md).

Check:

```sh
code --version
```

If `code` is not available from the terminal yet, the guide explains how to enable it.

## 6. Connect VS Code to GitHub and a repository

Read [vscode-github.md](vscode-github.md).

For an existing project, the simplest route is usually:

1. Open VS Code.
2. Open the Command Palette.
3. Run **Git: Clone**.
4. Choose **Clone from GitHub**.
5. Sign in in the browser when asked.
6. Choose the repository.
7. Choose a folder on the computer.
8. Open the cloned repository.

Or from a terminal:

```sh
gh repo clone OWNER/REPO
cd REPO
code .
```

## 7. Turn on AI help

Read [copilot.md](copilot.md).

Copilot Free can be activated directly in VS Code. Students verified through GitHub Education can separately activate Copilot Student.

## 8. Install Live Server

Read [live-server.md](live-server.md).

The extension ID is:

```text
ritwickdey.LiveServer
```

From a terminal:

```sh
code --install-extension ritwickdey.LiveServer
```

Then open `index.html` and click **Go Live**.

## 9. Understand what just happened

Read [local-server.md](local-server.md).

The important distinction:

```text
VS Code files on your computer
        ↓
Live Server
        ↓
http://localhost:PORT
        ↓
your browser

versus

GitHub repository
        ↓
GitHub Pages
        ↓
https://OWNER.github.io/REPO/
        ↓
anyone on the internet
```

Live Server is for development. GitHub Pages is for publishing.

## 10. Save work to GitHub

Read [../recipes/commit-and-push.md](../recipes/commit-and-push.md).

The basic loop is:

```sh
git status
git add path/to/file
git commit -m "Describe the change"
git push
```

VS Code's Source Control panel can perform the same operations visually.

## 11. Publish the website

Read [../recipes/github-pages.md](../recipes/github-pages.md).

Do not say the site is live until the Pages deployment and public URL have been verified.

## First-day completion checklist

The AI should verify all of these:

```text
[ ] GitHub account exists and email is verified
[ ] 2FA/passkey setup discussed
[ ] git --version works
[ ] gh --version works
[ ] gh auth status succeeds
[ ] VS Code opens
[ ] code --version works, or student knows how to open VS Code manually
[ ] repository is cloned/opened
[ ] Source Control sees the repository
[ ] Copilot Free or Student is activated if wanted
[ ] Live Server is installed
[ ] index.html opens through http://localhost:...
[ ] student understands localhost is not a public deployment
[ ] commit + push works
[ ] GitHub Pages public URL has been verified
```
