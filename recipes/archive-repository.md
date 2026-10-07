# Archive or unarchive a repository

## Goal

Make a repository read-only without deleting its history.

Archiving is usually preferable when the student's real goal is "retire this project" rather than "erase it".

## Archive

```sh
gh repo archive OWNER/REPO
```

## Unarchive

```sh
gh repo unarchive OWNER/REPO
```

## Verify

```sh
gh repo view OWNER/REPO --json nameWithOwner,isArchived,url
```

## Do not

Do not delete a repository when archive satisfies the request.
