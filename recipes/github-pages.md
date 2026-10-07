# Publish a static site with GitHub Pages

## Goal

Make a student's static HTML/CSS/JS project available at a public URL.

## Before you start

Confirm:
- the correct repository;
- the default branch (`main` in examples below);
- the site entry point exists (`index.html` for a simple static site);
- no secrets or private data will be published.

## Simple branch publishing

For a plain static site with files at repository root, enable Pages from `main` and `/`:

```sh
gh api --method POST repos/OWNER/REPO/pages \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

If the site belongs in `/docs`, use:

```sh
gh api --method POST repos/OWNER/REPO/pages \
  -f 'source[branch]=main' \
  -f 'source[path]=/docs'
```

If Pages already exists, update it instead of trying to create it again:

```sh
gh api --method PUT repos/OWNER/REPO/pages \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

## Verify configuration

```sh
gh api repos/OWNER/REPO/pages --jq '{status:.status,url:.html_url,source:.source}'
```

Wait for the build when necessary:

```sh
gh api repos/OWNER/REPO/pages/builds/latest --jq '{status:.status,error:.error.message}'
```

Then open the returned `html_url` in a browser.

## GitHub Actions publishing

Use Actions when the project needs a build or when the repository already has a Pages workflow. Do not replace an existing deployment strategy just because branch publishing is simpler.

The repository must use Pages build type `workflow`:

```sh
gh api --method PUT repos/OWNER/REPO/pages -f build_type=workflow
```

Then use the repository's existing workflow or add a standard Pages workflow appropriate to the project.

Inspect deployments:

```sh
gh run list -R OWNER/REPO --limit 10
```

## Browser fallback

Repository → **Settings** → **Pages** → choose the publishing source.

The helper can open the correct screen:

```sh
node browser/open-settings.mjs OWNER/REPO pages
```

## Do not

- Do not say a site is live because a commit was pushed. Verify the Pages deployment and open the URL.
- Do not publish secrets contained in a private repository; Pages is a public website in common configurations.
- Do not add a framework/build tool to a plain static site just to deploy it.
