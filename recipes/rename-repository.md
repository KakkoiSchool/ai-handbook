# Rename a repository

## Goal

Rename a GitHub repository without creating a new one.

## Before you start

Verify the current repository and the exact new name:

```sh
gh repo view OWNER/OLD --json nameWithOwner,url,visibility
```

## Rename

```sh
gh repo rename -R OWNER/OLD NEW
```

Let the CLI ask for confirmation unless the environment requires non-interactive operation and the student explicitly approved the rename.

## Update the local remote

GitHub redirects old repository URLs, but update the local remote so the configuration is truthful:

```sh
git remote set-url origin https://github.com/OWNER/NEW.git
```

If the repository used SSH before, keep SSH:

```sh
git remote set-url origin git@github.com:OWNER/NEW.git
```

## Verify

```sh
gh repo view OWNER/NEW --json nameWithOwner,url
git remote -v
```

## Do not

Do not create a second repository and copy files when the request is to rename the existing repository.
