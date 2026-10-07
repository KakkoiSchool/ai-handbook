# Install and use GitHub CLI (`gh`)

## Goal

Give the student and their AI a reliable command-line interface to GitHub. Prefer `gh` over browser clicking when the task is supported by the CLI.

Official manual: https://cli.github.com/manual/

## Install

### macOS

Preferred when Homebrew is installed:

```sh
brew install gh
```

Verify:

```sh
gh --version
```

### Windows

Using Windows Package Manager:

```powershell
winget install --id GitHub.cli
```

Close and reopen the terminal, then:

```powershell
gh --version
```

### Ubuntu / Debian

If the distribution provides GitHub CLI:

```sh
sudo apt update
sudo apt install gh
```

If that package is unavailable or too old, follow the current Linux instructions linked from https://cli.github.com/ rather than inventing an unofficial installer.

### Other systems

Use the official installation instructions linked from https://cli.github.com/.

## Authenticate

Use the browser flow:

```sh
gh auth login --web
```

Choose `github.com` and the protocol appropriate for the student's setup. Then configure Git to reuse the GitHub CLI credential helper:

```sh
gh auth setup-git
gh auth status
```

Do not ask the student to paste a token into chat.

## When to use `gh`

Use `gh` for GitHub-side operations:

```text
create/rename/archive/delete repository  -> gh repo ...
issues                                  -> gh issue ...
pull requests                           -> gh pr ...
releases                                -> gh release ...
Actions                                 -> gh run / gh workflow ...
repository settings                     -> gh repo edit ...
REST operations without a high-level cmd-> gh api ...
```

Use ordinary `git` for local history and file synchronization:

```text
status, add, commit, branch, switch, fetch, pull, push, remote
```

## Useful checks

```sh
gh auth status
gh repo view OWNER/REPO
gh repo list OWNER --limit 100
gh status
```

## Permissions

A command can be correct and still fail because the account lacks permission. Treat `403`, `404` on private resources, or organization-policy errors as permission problems until evidence says otherwise.

Repository deletion requires the `delete_repo` OAuth scope. Add it only when deletion is actually requested:

```sh
gh auth refresh -s delete_repo
```

## Do not

- Do not run `gh auth token` and print the result.
- Do not create a personal repository when the student asked for a KakkoiSchool repository.
- Do not install random GitHub CLI extensions unless the recipe explicitly requires one.
- Do not use `gh api` when a clear high-level command already exists.
