# Create a GitHub repository

## Goal

Create a repository under the student's own account or another explicitly named owner.

## Before you start

Know:
- repository name;
- owner;
- public/private choice;
- whether a local project already exists.

Never guess the owner.

## Preferred path: existing local project

From inside the project:

```sh
gh repo create OWNER/REPO --public --source=. --remote=origin --push
```

Use `--private` instead when requested.

## Preferred path: new empty remote

```sh
gh repo create OWNER/REPO --public --add-readme
```

Or interactively:

```sh
gh repo create
```

## Verify

```sh
gh repo view OWNER/REPO --json nameWithOwner,url,visibility,defaultBranchRef
```

If a local project was pushed:

```sh
git remote -v
git status
```

## Browser fallback

Open https://github.com/new, choose the exact owner, enter the name, choose visibility, and create the repository. If the AI cannot use the browser directly, use `browser/open-new-repo.mjs` to get the student to the correct page.

## Do not

- Do not silently create `student/REPO` when `KakkoiSchool/REPO` was requested.
- Do not initialize the remote with conflicting files when pushing an existing local history unless you intend to reconcile histories.
- Do not say the repository exists until `gh repo view` or the GitHub page confirms it.
