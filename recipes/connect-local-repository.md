# Connect an existing local folder to GitHub

## Goal

Attach a local Git repository to an already existing GitHub repository.

## Before you start

Verify the intended remote exists:

```sh
gh repo view OWNER/REPO
```

Inspect local remotes:

```sh
git remote -v
```

## Add the remote

If `origin` does not exist:

```sh
git remote add origin https://github.com/OWNER/REPO.git
```

If `origin` exists but is wrong, do not overwrite it silently. Inspect it, then when the student confirms:

```sh
git remote set-url origin https://github.com/OWNER/REPO.git
```

Push the current branch:

```sh
git push -u origin HEAD
```

## Verify

```sh
git remote -v
git status
```
