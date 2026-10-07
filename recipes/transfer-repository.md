# Transfer a repository to another owner

## Goal

Move an existing repository to another user or organization while preserving history, issues, stars, and repository identity.

This is different from renaming.

## Preferred path

Repository transfer has permission, organization, name-conflict, and acceptance rules. Prefer GitHub's repository settings UI for students:

1. Open the repository.
2. Settings → General.
3. Scroll to **Danger Zone**.
4. Choose **Transfer ownership**.
5. Enter the new owner and follow GitHub's confirmation flow.

Open settings with:

```sh
node browser/open-settings.mjs OWNER/REPO general
```

## API-capable agents

If the environment has an authenticated GitHub API action specifically supporting repository transfer, use it only after verifying both source and destination owners.

Do not invent a raw API request from memory when the browser flow is available.

## Verify

```sh
gh repo view NEW_OWNER/REPO --json nameWithOwner,url
```

Update local remote URLs after transfer.

## Do not

- Do not simulate a transfer by creating a new repository and copying files unless the student explicitly wants a copy rather than a transfer.
- Do not transfer a KakkoiSchool repository out of the organization without explicit authority.
