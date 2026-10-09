---
name: publish
description: Guide a Kakkoi School student from a local project to a verified public GitHub Pages URL.
---

# /publish PROJECT

## Goal

Publish a student's browser project through GitHub and GitHub Pages, preserving the project's existing architecture.

Examples:

```text
/publish my-game
/publish ./projects/cat-game
/publish .
```

This skill orchestrates existing Kakkoi School Git/GitHub recipes. It does not invent a second deployment system.

## 1. Resolve and inspect the project

Resolve the project exactly as in [../serve/SKILL.md](../serve/SKILL.md).

Read local project instructions first.

Inspect:

```sh
git status
git remote -v
git branch --show-current
```

When available, also check:

```sh
gh auth status
```

Determine whether the project already has:

- a Git repository;
- a GitHub remote;
- an existing Pages configuration/workflow;
- a documented build/deploy command.

Preserve what already works.

## 2. Verify locally first

Before publishing a web project, run the equivalent of `/serve PROJECT` and verify the intended page locally.

Do not publish a page that is already visibly broken unless the student explicitly asks to publish that state.

## 3. Check what will become public

Before staging or publishing:

- inspect intended changed/untracked files;
- make sure `.env`, credentials, tokens, private keys, or private student data are not being committed;
- respect the project's `.gitignore`.

Never solve a secret leak by merely hiding it from the UI. Remove it from the intended commit before publishing.

## 4. Get the project onto the correct GitHub repository

Use the root handbook's GitHub capability order.

If a GitHub remote already exists, verify it is the intended `OWNER/REPO`.

If there is no repository or remote, follow:

- [../../recipes/create-repository.md](../../recipes/create-repository.md)
- [../../recipes/kakkoischool-repository.md](../../recipes/kakkoischool-repository.md) when the requested owner is KakkoiSchool
- [../../recipes/connect-local-repository.md](../../recipes/connect-local-repository.md) when connecting an existing local folder

Do **not** guess whether the owner should be the student's personal account or `KakkoiSchool`. If it is not clear from the request/project, ask.

Do not silently create a personal repository when a KakkoiSchool repository was requested.

## 5. Commit and push

Follow [../../recipes/commit-and-push.md](../../recipes/commit-and-push.md).

Stage only intended files.

Verify the push reached the intended remote and branch before proceeding.

## 6. Publish with the project's appropriate Pages path

Follow [../../recipes/github-pages.md](../../recipes/github-pages.md).

Decision order:

1. If the repository already has a Pages workflow/deployment strategy, keep it.
2. If the project has a documented build output, use the project's documented output/workflow.
3. For a plain static site whose `index.html` is at repository root, publish `main:/` with GitHub Pages.
4. Do not introduce Vercel, Netlify, Firebase, a framework, or a new build system merely to publish a static project.

If GitHub requires a one-time Pages setting that the current tool cannot change, guide the student through **Repository → Settings → Pages** rather than pretending the deployment succeeded.

## 7. Verify the public result

Use GitHub/gh to inspect Pages:

```sh
gh api repos/OWNER/REPO/pages --jq '{status:.status,url:.html_url,source:.source}'
```

When useful:

```sh
gh api repos/OWNER/REPO/pages/builds/latest --jq '{status:.status,error:.error.message}'
```

Then open the returned public URL.

Verify:

- it returns successfully;
- the expected project is displayed;
- critical assets load;
- there is no blocking browser-console startup error.

A successful push or Actions run is not enough. The public URL is the final verification.

## 8. Finish with the useful information

Tell the student:

- the GitHub repository URL;
- the public Pages URL;
- the branch/deployment path;
- the simple update loop: edit → test locally → commit → push → verify deployment.

If publishing exposed a reusable workflow that is not already covered by a skill, follow the root agent rule and offer to save it as a new skill.

## Do not

- Do not publish secrets.
- Do not change repository visibility without explicit student intent.
- Do not change repository owner.
- Do not replace an existing deployment architecture just because another one is familiar.
- Do not claim the site is live until the public URL has been verified.
