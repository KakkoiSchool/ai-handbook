# Install Git

## Goal

Install the local version-control program used underneath VS Code and GitHub workflows.

Git and GitHub are different:

```text
Git
= version history on your computer

GitHub
= a website/service that stores Git repositories online
```

## macOS

First check:

```sh
git --version
```

If Git is missing, a simple Apple-supported path is:

```sh
xcode-select --install
```

If the student already uses Homebrew:

```sh
brew install git
```

Official Git installation page:
https://git-scm.com/install/mac

## Windows

Using winget:

```powershell
winget install --id Git.Git -e --source winget
```

Restart VS Code/terminal afterward.

Official page:
https://git-scm.com/install/windows

## Linux

Use the distribution's package manager. On Debian/Ubuntu:

```sh
sudo apt update
sudo apt install git
```

## Verify

```sh
git --version
```

## Configure commit identity

Git commits contain an author name and email. Ask the student what identity they want to use; do not invent it.

```sh
git config --global user.name "Student Name"
git config --global user.email "student@example.com"
```

Inspect:

```sh
git config --global --get user.name
git config --global --get user.email
```

The email can be the GitHub account email or GitHub's privacy-protecting no-reply address if the student has configured that option.
