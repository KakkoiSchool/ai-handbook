# Browser helpers

These Playwright scripts are a **fallback bridge** between an AI and GitHub's web UI. They are not the primary automation layer.

Prefer:

1. connected GitHub API/tool;
2. `gh`;
3. `git`;
4. these helpers.

See [`../recipes/browser-fallback.md`](../recipes/browser-fallback.md).

## Why persistent login?

Some GitHub settings pages require authentication. `login.mjs` opens a dedicated local Chromium profile so the student can log in manually once. The scripts can then navigate authenticated pages without ever receiving the student's password or 2FA code.

The profile lives at `../.playwright-profile/` and is ignored by Git. Treat it like a secret because browser session state can authenticate as the student.

## What these scripts intentionally do not do

- enter passwords;
- enter 2FA codes;
- reveal cookies or tokens;
- click delete/transfer/visibility confirmation buttons;
- bypass organization permissions;
- try alternate buttons when GitHub's UI no longer matches expectations.

When a helper cannot accomplish a task safely, it should get the student to the relevant page and let the student perform the final confirmation.
