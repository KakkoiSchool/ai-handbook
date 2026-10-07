# Prompt: set up a student's computer

Give this to an AI together with the handbook URL.

```text
Use https://github.com/KakkoiSchool/ai-handbook as the source of truth.

I am a Kakkoi School student setting up this computer.

Read:
1. START-HERE.md
2. AGENTS.md
3. setup/README.md

Then guide me through the setup in order.

First, check whether I already have a GitHub account.
If I do not, read setup/github-account.md and help me create one safely.
Wait until the account exists and the email is verified before continuing to Git/GitHub CLI setup.

Rules:
- Check whether something is already installed before installing it.
- Prefer GitHub CLI for GitHub-side actions.
- Use normal Git for local repository actions.
- Do not ask me to paste passwords, 2FA codes, cookies, recovery codes, or tokens into chat.
- Do not invent my Git name/email; ask me if they are missing.
- Do not create a repository under my personal account if I asked for KakkoiSchool.
- Verify each completed step before moving on.
- Keep explanations short unless I ask why something works.
- Once setup is complete, follow setup/first-project.md so we verify the whole path from localhost to GitHub Pages.
```
