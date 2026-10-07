# Student setup: prepare a computer for Kakkoi School

## Goal

Take a student's fresh computer from "I have GitHub" to "my AI can safely help me create, edit, push, and publish Kakkoi School projects".

This is the **first recipe** to use with a new student or new computer.

## Rule for the AI

Do the checks first. Install only what is missing.

Do not invent the student's:
- GitHub username;
- real name;
- email address;
- organization permissions.

Ask only when one of those values is actually needed.

---

## 1. Check what is already installed

Run:

```sh
git --version
gh --version
```

If both work, skip to **3. Sign in to GitHub**.

---

## 2. Install Git and GitHub CLI

### macOS

Check Git:

```sh
git --version
```

If macOS asks to install Command Line Tools, let the student approve it.

If Homebrew is already installed, GitHub CLI is:

```sh
brew install gh
```

Verify:

```sh
git --version
gh --version
```

Do not install Homebrew merely because the AI prefers it if `git` and `gh` are already available.

### Windows

Install Git:

```powershell
winget install --id Git.Git -e
```

Install GitHub CLI:

```powershell
winget install --id GitHub.cli -e
```

Close and reopen the terminal, then:

```powershell
git --version
gh --version
```

### Ubuntu / Debian

```sh
sudo apt update
sudo apt install git gh
```

Then:

```sh
git --version
gh --version
```

If the distribution does not provide a usable `gh` package, follow the current official GitHub CLI Linux installation instructions rather than inventing an installer.

---

## 3. Sign in to GitHub safely

Use GitHub's browser login:

```sh
gh auth login --web
```

The student completes the GitHub login in their browser.

Then configure Git to use the authenticated GitHub CLI credentials:

```sh
gh auth setup-git
gh auth status
```

### Never

- ask the student to paste a GitHub password into chat;
- ask the student to paste a 2FA code into chat;
- print `gh auth token`;
- save a token in a project file.

---

## 4. Configure Git identity

Inspect first:

```sh
git config --global user.name
git config --global user.email
```

If either value is missing, ask the student what they want Git commits to use.

Then set exactly what they provided:

```sh
git config --global user.name "STUDENT NAME"
git config --global user.email "STUDENT EMAIL"
```

Verify:

```sh
git config --global user.name
git config --global user.email
```

The email does not have to be public. Students may use a GitHub-provided no-reply commit email if they prefer.

---

## 5. Confirm GitHub access

Check the signed-in account:

```sh
gh api user --jq '.login'
```

Confirm GitHub itself works:

```sh
gh repo list --limit 5
```

Then check that KakkoiSchool is visible:

```sh
gh repo list KakkoiSchool --limit 5
```

Seeing KakkoiSchool repositories does **not** prove the student can create repositories in the organization. Creation permission is checked only when a KakkoiSchool repository is actually requested.

If GitHub reports a permission error, explain the error. Do not silently switch to the student's personal account.

---

## 6. Create a projects folder

Use an ordinary folder the student can find again.

### macOS / Linux

```sh
mkdir -p ~/Projects
cd ~/Projects
```

### Windows PowerShell

```powershell
New-Item -ItemType Directory -Force "$HOME\Projects"
Set-Location "$HOME\Projects"
```

Do not create hidden or tool-specific project directories.

---

## 7. Final setup check

Run:

```sh
git --version
gh --version
gh auth status
git config --global user.name
git config --global user.email
```

The setup is ready when:

- Git runs;
- GitHub CLI runs;
- `gh auth status` says the student is authenticated;
- Git has the identity the student chose.

KakkoiSchool organization write permission is **not** a prerequisite for learning or for personal repositories.

---

## 8. What the student can ask next

Examples:

> Create my first project.

Read: [create-local-project.md](create-local-project.md)

> Put this project on GitHub.

Read: [create-repository.md](create-repository.md)

> Put this project in KakkoiSchool.

Read: [kakkoischool-repository.md](kakkoischool-repository.md)

> Make my website live.

Read: [github-pages.md](github-pages.md)

> Add multiplayer to my game.

Read: [multiplayer.md](multiplayer.md)

---

## Prompt for the student's AI

The student can copy this:

> Read https://github.com/KakkoiSchool/ai-handbook first. I am setting up my computer for Kakkoi School. Follow `recipes/student-setup.md` exactly. Check what is already installed before installing anything. Never ask me to paste passwords, 2FA codes, or GitHub tokens into chat. Verify each step before saying it worked.
