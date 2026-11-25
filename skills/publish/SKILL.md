---
name: publish
description: Guide a student from a named local project to a verified deployment, using the existing host or defaulting to GitHub Pages for new static sites.
---

# /publish PROJECT

## Goal

Given a project name or path, take the student from local files to a **verified deployment URL**.

Examples:

```text
/publish my-game
/publish projects/cat-site
/publish .
```

This skill coordinates the handbook's Git and deployment recipes.

## 1. Find and inspect the project

Resolve the named project exactly as in [../serve/SKILL.md](../serve/SKILL.md).

Read local instructions first when present:

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- deployment workflows under `.github/workflows/`
- `package.json` or equivalent build configuration
- Wrangler configuration or other deployment settings

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

## 2. Choose the deployment route

| Project or request | Route |
|---|---|
| Existing deployment provider or workflow | Keep it and verify the intended target. |
| Cloudflare Worker, including an existing Wrangler-configured project | Follow [Cloudflare Workers](../../recipes/cloudflare.md#deploy-a-worker-for-an-api-or-relay). |
| Existing Pages site getting a custom domain | Follow [Cloudflare DNS for Pages](../../recipes/cloudflare.md#custom-domain-for-github-pages) when Cloudflare manages the DNS. |
| Game explicitly targeting itch.io, or already released there | Follow [itch.io publishing](../../recipes/itch-io.md). For an existing Butler or CI workflow, use [itch.io automation](../../recipes/itch-io-automation.md). |
| New static site or browser game with no requested host | Follow [GitHub Pages](../../recipes/github-pages.md). A root `index.html` can use `main:/` directly. |
| New project that needs server-side code | Follow the requested or documented host. Use [the Cloudflare recipe](../../recipes/cloudflare.md) when Workers fits the project. If the host is unclear, establish the intended destination before deploying. |

## 3. Verify it locally first

For a downloadable game, test the intended release build on its target OS. Before publishing a browser project, run the equivalent of:

```text
/serve PROJECT
```

and verify the intended page works locally.

Do not publish a visibly broken page as though publishing will fix it.

## 4. Check what is about to become public

Before staging or publishing:

- inspect changed and untracked files;
- respect the project's `.gitignore`;
- make sure `.env`, credentials, tokens, private keys, or private student data are not being committed.

Never ask the student to paste a secret into chat.

If sensitive data is present, stop and remove it from the intended commit before continuing.

## 5. Make sure GitHub setup exists when the deployment uses it

For a direct itch.io upload, follow the itch.io recipe after local verification and the release-file check. Skip steps 5–7 unless the student also requested GitHub or the established deployment uses it.

If Git, `gh`, or GitHub authentication is missing, route to:

[../../setup/README.md](../../setup/README.md)

Preferred GitHub authentication:

```sh
gh auth login --web
gh auth setup-git
gh auth status
```

Never ask for passwords, 2FA codes, tokens, cookies, or recovery codes in chat.

## 6. Determine the intended GitHub owner

Do not guess whether the project belongs under:

```text
KakkoiSchool/PROJECT
```

or the student's personal GitHub account.

Use an existing remote when it is clearly correct.

If no GitHub repository exists and ownership is not already clear, ask the student which owner they want.

If KakkoiSchool creation fails for lack of permission, report that problem. Do not silently create a personal substitute.

## 7. Save and push the intended work

Follow the existing recipes rather than duplicating Git behavior here:

- [../../recipes/create-repository.md](../../recipes/create-repository.md)
- [../../recipes/kakkoischool-repository.md](../../recipes/kakkoischool-repository.md)
- [../../recipes/connect-local-repository.md](../../recipes/connect-local-repository.md)
- [../../recipes/commit-and-push.md](../../recipes/commit-and-push.md)

Review changes before committing. Stage only intended files.

Verify the intended commit reached the intended remote and branch.

## 8. Deploy and verify the selected target

Run the selected deployment workflow or wait for its CI deployment. Publishing is complete after the intended version is running and verified at the deployment URL.

For **GitHub Pages**, use [the Pages recipe](../../recipes/github-pages.md). Keep any existing Pages workflow or documented build output. If the tool cannot change a required Pages setting, guide the student through **Repository → Settings → Pages**. Check the configured URL:

```sh
gh api repos/OWNER/REPO/pages --jq '{status:.status,url:.html_url,source:.source}'
```

Inspect the latest deployment or build when relevant. For **Workers**, follow the Cloudflare recipe and verify the expected endpoint response or relay behavior. For other hosts, use the project's deployment checks.

Open the result and check that the intended page and critical assets load, the browser has no blocking startup error, and the changed feature works. For an API-only deployment, exercise the intended request against the deployed endpoint.

## 9. Report simply

Finish with:

- repository URL, if used;
- deployment URL and provider;
- branch/workflow used;
- what was verified at that URL;
- how to update the release with the selected host or workflow.

If this publishing session uncovered another genuinely reusable workflow that is not already a skill, follow the root agent rule and offer to save it as a skill.

## Do not

- do not publish secrets or private files;
- do not change repository visibility without explicit approval;
- do not silently choose a different GitHub owner;
- do not replace an existing deployment architecture unnecessarily;
- do not say "published" after only pushing a commit;
- do not invent another hosting service when the requested/default path is GitHub Pages.
