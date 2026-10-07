# Create a repository in KakkoiSchool

## Goal

Create `KakkoiSchool/NAME` for a student project.

## Before you start

The authenticated GitHub account must be allowed to create repositories in the `KakkoiSchool` organization.

Check authentication:

```sh
gh auth status
```

Optionally confirm organization visibility:

```sh
gh repo list KakkoiSchool --limit 5
```

## Preferred path

For an existing local project:

```sh
gh repo create KakkoiSchool/NAME --public --source=. --remote=origin --push
```

For a new remote:

```sh
gh repo create KakkoiSchool/NAME --public --add-readme
```

## If permission is denied

Stop. Do not create the repository under the student's personal account as a substitute.

Tell the student:

> GitHub refused creation in KakkoiSchool. Your account needs organization permission (or an instructor needs to create the repository). I have not created a different repository instead.

The student can then ask a Kakkoi School maintainer to create it, or create a personal repository if they explicitly choose that alternative.

## Verify

```sh
gh repo view KakkoiSchool/NAME --json nameWithOwner,url,visibility
```

## Do not

- Do not guess organization permissions.
- Do not work around organization rules with a personal fork unless requested.
