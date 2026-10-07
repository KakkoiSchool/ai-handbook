# Commit and push changes

## Goal

Save local work in Git and publish it to the configured GitHub remote.

## Inspect first

```sh
git status
git diff
git branch --show-current
git remote -v
```

## Commit

Stage only intended files:

```sh
git add path/to/file another/file
git diff --cached
git commit -m "Describe the change"
```

Push:

```sh
git push
```

If this is a new branch:

```sh
git push -u origin HEAD
```

## Verify

```sh
git status
git log --oneline -1
```

When useful:

```sh
gh repo view --web
```

## Do not

- Do not use `git add .` blindly in a repository that may contain secrets or generated files.
- Do not force push unless the student explicitly needs history rewriting and understands the target branch.
