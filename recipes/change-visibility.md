# Change repository visibility

## Goal

Change a repository between public/private/internal when the student explicitly requests it.

## Before you start

```sh
gh repo view OWNER/REPO --json nameWithOwner,visibility,url
```

Visibility changes can affect forks, stars/watchers, rulesets, Actions history visibility, and access. Treat this as a high-impact action.

## Change visibility

Public:

```sh
gh repo edit OWNER/REPO --visibility public --accept-visibility-change-consequences
```

Private:

```sh
gh repo edit OWNER/REPO --visibility private --accept-visibility-change-consequences
```

Internal is only available where GitHub supports it:

```sh
gh repo edit OWNER/REPO --visibility internal --accept-visibility-change-consequences
```

## Verify

```sh
gh repo view OWNER/REPO --json nameWithOwner,visibility,url
```
