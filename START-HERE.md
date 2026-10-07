# Start here — Kakkoi School student setup

You do **not** need to understand this whole repository.

Give this repository URL to your AI:

```text
https://github.com/KakkoiSchool/ai-handbook
```

Then say:

```text
Read the Kakkoi School AI Handbook first.

Help me set up this computer for Kakkoi School.
Follow setup/README.md in order.
Use the handbook instead of guessing commands.
Ask me only when you need information that cannot be discovered safely,
such as the GitHub username or the name/email I want on my commits.
Verify each step before moving to the next one.
Do not ask me to paste passwords, 2FA codes, cookies, or tokens into chat.
```

The expected first-day path is:

```text
GitHub account
    ↓
Git
    ↓
GitHub CLI (gh)
    ↓
GitHub login
    ↓
VS Code
    ↓
open/clone project
    ↓
AI assistant (optional)
    ↓
Live Server
    ↓
localhost test
    ↓
commit + push
    ↓
GitHub Pages
    ↓
public website
```

## Quick health check

macOS / Linux:

```sh
bash setup/check-setup.sh
```

Windows PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File setup/check-setup.ps1
```

The checks are read-only. They do not install software or change the student's account.

## First project

After the computer is ready, continue with:

[setup/first-project.md](setup/first-project.md)

That guide creates a tiny website, runs it locally, puts it on GitHub, and publishes it with GitHub Pages.
