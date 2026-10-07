# Issues

## Goal

Create, inspect, edit, and close GitHub issues.

## Create

```sh
gh issue create -R OWNER/REPO --title "Title" --body "Description"
```

Interactive creation:

```sh
gh issue create -R OWNER/REPO
```

## List / view

```sh
gh issue list -R OWNER/REPO
gh issue view NUMBER -R OWNER/REPO
```

## Close / reopen

```sh
gh issue close NUMBER -R OWNER/REPO
gh issue reopen NUMBER -R OWNER/REPO
```

## Verify

```sh
gh issue view NUMBER -R OWNER/REPO --json number,title,state,url
```
