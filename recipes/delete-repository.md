# Delete a repository

## Goal

Permanently delete a GitHub repository when the student explicitly requested deletion.

## This is destructive

Before doing anything, verify the exact target:

```sh
gh repo view OWNER/REPO --json nameWithOwner,url,visibility
```

Ask yourself: did the student explicitly ask to delete **this exact repository**? If not, stop.

## Permission

GitHub CLI repository deletion requires the `delete_repo` scope:

```sh
gh auth refresh -s delete_repo
```

## Delete

Preferred interactive form:

```sh
gh repo delete OWNER/REPO
```

Let the CLI confirmation remain visible to the student.

Only use:

```sh
gh repo delete OWNER/REPO --yes
```

when the student has already explicitly approved deletion of the exact `OWNER/REPO` and the environment cannot answer an interactive prompt.

## Verify

```sh
gh repo view OWNER/REPO
```

Expected: GitHub reports that the repository cannot be found/accessed.

## Do not

- Do not infer deletion from words like "remove from my list", "stop using", or "old project"; archive may be the right operation.
- Do not delete a similarly named repository.
- Do not automate the browser confirmation as a way to avoid explicit student intent.
