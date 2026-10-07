# Open a pull request

## Goal

Propose a branch for review and merge.

## Before you start

```sh
git status
git branch --show-current
git log --oneline -3
git push -u origin HEAD
```

## Create

If the commits already explain the change:

```sh
gh pr create --fill
```

Or give an explicit title/body:

```sh
gh pr create --title "Short title" --body "What changed, why, and how it was checked."
```

For a non-default base:

```sh
gh pr create --base BASE --fill
```

## Verify

```sh
gh pr view --json number,title,state,url,baseRefName,headRefName
```

If checks exist:

```sh
gh pr checks --watch
```

## Do not

Do not open duplicate PRs because a previous command timed out. Search/view first.
