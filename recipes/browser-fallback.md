# Browser fallback

## Goal

Help the student complete or inspect GitHub UI tasks when the AI cannot directly use a GitHub API or `gh`.

## Use browser automation only after

1. native GitHub tool/API is unavailable;
2. `gh` is unavailable or the operation is genuinely UI-only;
3. ordinary `git` cannot accomplish the GitHub-side task.

## Setup

From this handbook repository:

```sh
cd browser
npm install
npx playwright install chromium
```

Start the persistent GitHub browser profile:

```sh
npm run login
```

A headed Chromium window opens. The **student** logs into GitHub normally, including any 2FA. Close the browser when finished. The local `.playwright-profile/` directory keeps the browser session for later helper scripts.

That directory is ignored by Git. It may contain authenticated session data: **never commit, upload, or send it to the AI.**

## Useful helpers

Open repository creation:

```sh
npm run new-repo -- KakkoiSchool
```

Open settings:

```sh
npm run settings -- OWNER/REPO
npm run settings -- OWNER/REPO pages
npm run settings -- OWNER/REPO general
```

Inspect a page and produce machine-readable output plus a screenshot:

```sh
npm run inspect -- https://github.com/OWNER/REPO/settings/pages
```

Verify a deployed website:

```sh
npm run verify -- https://owner.github.io/repo/
```

The student can paste the JSON output back to the AI if the AI itself cannot see the browser.

## Safety rules

- Never automate GitHub password or 2FA entry.
- Never print cookies/local storage/session tokens.
- Never click destructive confirmations automatically.
- Use role/text-based selectors only for helpers that merely navigate; GitHub UI changes, so fail clearly rather than guessing a different button.
- Do not use browser scripts to bypass organization policy or branch protection.
