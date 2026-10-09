---
name: publish
description: Guide a student from a named local project to a verified public GitHub Pages deployment, preserving the project's existing build/deployment architecture.
---

# /publish

## Goal

Given a project name or path, guide the student through publishing it and finish with a verified public URL.

Examples:

```text
/publish my-game
/publish projects/cat-site
```

This skill coordinates the existing Git/GitHub recipes. It does not invent a second publishing system.

## 1. Find and inspect the project

Resolve the named project exactly as in `/serve`.

Read local instructions first when present:

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- deployment workflows under `.github/workflows/`
- `package.json` or equivalent build configuration

Inspect:

```sh
git status
git branch --show-current
git remote -v
```

Determine whether the project is:

- a plain static site;
- a site with an existing build/deploy workflow;
- not yet a Git repository;
- a Git repository without a GitHub remote.

Preserve an existing deployment architecture unless the student explicitly asks to replace it.

## 2. Make sure GitHub setup exists

If Git, `gh`, or GitHub authentication is missing, route to the relevant setup instructions instead of improvising:

[../../setup/README.md](../../setup/README.md)

Never ask for passwords, 2FA codes, tokens, cookies, or recovery codes in chat.

Preferred GitHub authentication:

```sh
gh auth login --web
gh auth setup-git
gh auth status
```

## 3. Determine the intended GitHub owner

Do not guess whether the project belongs under:

```text
KakkoiSchool/PROJECT
```

or the student's personal GitHub account.

Use an existing remote when it is clearly correct.

If no GitHub repository exists and ownership is not already clear, ask the student which owner they want.

If KakkoiSchool creation fails for lack of permission, report that problem. Do not silently create a personal substitute.

## 4. Save and push the intended work

Follow the existing repository recipes rather than duplicating Git behavior here:

- [../../recipes/create-repository.md](../../recipes/create-repository.md)
- [../../recipes/kakkoischool-repository.md](../../recipes/kakkoischool-repository.md)
- [../../recipes/commit-and-push.md](../../recipes/commit-and-push.md)

Review the changes before committing. Do not blindly stage unrelated files.

Verify that the intended commit reached the intended remote.

## 5. Publish with GitHub Pages

Follow the authoritative Kakkoi Pages recipe:

[../../recipes/github-pages.md](../../recipes/github-pages.md)

For a plain static site, use the simplest Pages source that fits the project.

For a project that already builds with GitHub Actions, preserve that workflow and use Pages' workflow mode.

Do not add React, Vite, npm, or another build tool merely to publish a static site.

## 6. Verify the public result

Publishing is not complete when `git push` succeeds.

Verify Pages configuration:

```sh
gh api repos/OWNER/REPO/pages --jq '{status:.status,url:.html_url,source:.source}'
```

Check the latest build/deployment when relevant:

```sh
gh api repos/OWNER/REPO/pages/builds/latest --jq '{status:.status,error:.error.message}'
```

Then open the returned public URL.

Confirm the expected page/game actually loads. For a browser game, also check the console for startup errors.

Only after this should you tell the student it is published.

## 7. Report simply

Finish with:

- repository URL;
- public Pages URL;
- branch/workflow used;
- whether the public page was actually verified.

## Do not

- do not publish secrets or private files;
- do not change repository visibility without explicit approval;
- do not silently choose a different GitHub owner;
- do not replace an existing deployment architecture unnecessarily;
- do not say “published” after only pushing a commit;
- do not invent another hosting service when the requested/default path is GitHub Pages.
