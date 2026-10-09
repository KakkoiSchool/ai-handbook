---
name: publish
description: Guide a student from a named local project to a verified public GitHub Pages deployment, preserving the project's existing build/deployment architecture.
---

# /publish PROJECT

## Goal

Given a project name or path, take the student from local files to a **verified public GitHub Pages URL**.

Examples:

```text
/publish my-game
/publish projects/cat-site
/publish .
```

This skill coordinates existing Kakkoi School Git/GitHub recipes. It does not invent a second publishing system.

## 1. Find and inspect the project

Resolve the named project exactly as in [../serve/SKILL.md](../serve/SKILL.md).

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

When available:

```sh
gh auth status
```

Determine whether the project is:

- a plain static site;
- a site with an existing build/deploy workflow;
- not yet a Git repository;
- a Git repository without a GitHub remote.

Preserve an existing deployment architecture unless the student explicitly asks to replace it.

## 2. Verify it locally first

Before publishing a browser project, run the equivalent of:

```text
/serve PROJECT
```

and verify the intended page works locally.

Do not publish a visibly broken page as though publishing will fix it.

## 3. Check what is about to become public

Before staging or publishing:

- inspect changed and untracked files;
- respect the project's `.gitignore`;
- make sure `.env`, credentials, tokens, private keys, or private student data are not being committed.

Never ask the student to paste a secret into chat.

If sensitive data is present, stop and remove it from the intended commit before continuing.

## 4. Make sure GitHub setup exists

If Git, `gh`, or GitHub authentication is missing, route to:

[../../setup/README.md](../../setup/README.md)

Preferred GitHub authentication:

```sh
gh auth login --web
gh auth setup-git
gh auth status
```

Never ask for passwords, 2FA codes, tokens, cookies, or recovery codes in chat.

## 5. Determine the intended GitHub owner

Do not guess whether the project belongs under:

```text
KakkoiSchool/PROJECT
```

or the student's personal GitHub account.

Use an existing remote when it is clearly correct.

If no GitHub repository exists and ownership is not already clear, ask the student which owner they want.

If KakkoiSchool creation fails for lack of permission, report that problem. Do not silently create a personal substitute.

## 6. Save and push the intended work

Follow the existing recipes rather than duplicating Git behavior here:

- [../../recipes/create-repository.md](../../recipes/create-repository.md)
- [../../recipes/kakkoischool-repository.md](../../recipes/kakkoischool-repository.md)
- [../../recipes/connect-local-repository.md](../../recipes/connect-local-repository.md)
- [../../recipes/commit-and-push.md](../../recipes/commit-and-push.md)

Review changes before committing. Stage only intended files.

Verify the intended commit reached the intended remote and branch.

## 7. Publish with GitHub Pages

Follow:

[../../recipes/github-pages.md](../../recipes/github-pages.md)

Decision order:

1. If the repository already has a Pages workflow/deployment strategy, keep it.
2. If the project documents a build output, use that output/workflow.
3. For a plain static site whose `index.html` is at repository root, use the simplest Pages source from `main:/`.
4. Do not add React, Vite, npm, another build tool, or another hosting service merely to publish a static site.

If GitHub requires a one-time Pages setting the current tool cannot change, guide the student through **Repository → Settings → Pages** rather than pretending deployment succeeded.

## 8. Verify the public result

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

Confirm:

- the URL loads;
- the expected page/game is displayed;
- critical assets load;
- browser apps/games have no blocking startup error.

Only after this should you tell the student it is published.

## 9. Report simply

Finish with:

- repository URL;
- public Pages URL;
- branch/workflow used;
- whether the public page was actually verified;
- the update loop: edit → `/serve` → commit/push → verify deployment.

If this publishing session uncovered another genuinely reusable workflow that is not already a skill, follow the root agent rule and offer to save it as a skill.

## Do not

- do not publish secrets or private files;
- do not change repository visibility without explicit approval;
- do not silently choose a different GitHub owner;
- do not replace an existing deployment architecture unnecessarily;
- do not say "published" after only pushing a commit;
- do not invent another hosting service when the requested/default path is GitHub Pages.
