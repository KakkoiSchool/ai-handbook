# Branches

## Goal

Create, switch, publish, and remove Git branches safely.

## Inspect

```sh
git status
git branch --show-current
git branch -a
```

## Create and switch

```sh
git switch -c feature/name
```

Publish:

```sh
git push -u origin HEAD
```

Switch back:

```sh
git switch main
```

Fetch remote changes:

```sh
git fetch --prune
```

Delete a local branch after it is safely merged:

```sh
git branch -d feature/name
```

Delete the remote branch:

```sh
git push origin --delete feature/name
```

## Do not

Do not use `git branch -D` merely because `-d` refuses. The refusal often means Git is protecting unmerged work.
