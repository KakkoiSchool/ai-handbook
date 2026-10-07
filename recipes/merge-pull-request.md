# Merge a pull request

## Goal

Merge an approved, passing pull request using the repository's allowed merge method.

## Inspect first

```sh
gh pr view NUMBER --json number,title,state,mergeable,reviewDecision,statusCheckRollup,url
```

Watch checks when needed:

```sh
gh pr checks NUMBER --watch
```

## Merge

Prefer the repository's established merge method. A common Kakkoi School choice is squash:

```sh
gh pr merge NUMBER --squash --delete-branch
```

If repository settings reject squash, inspect allowed methods instead of repeatedly guessing.

## Verify

```sh
gh pr view NUMBER --json state,mergedAt,mergeCommit,url
```

Then, for a local clone:

```sh
git switch main
git pull --ff-only
```

## Do not

- Do not merge failing checks unless the student explicitly has authority and asks to bypass them.
- Do not report "merged" from a merge attempt alone; inspect `mergedAt`.
