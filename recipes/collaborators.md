# Collaborators

## Goal

Inspect, invite, or remove repository collaborators.

Organization policy may restrict these operations.

## List collaborators

```sh
gh api repos/OWNER/REPO/collaborators --jq '.[].login'
```

## Invite / grant access

Example with push access:

```sh
gh api --method PUT repos/OWNER/REPO/collaborators/USERNAME -f permission=push
```

GitHub may create a pending invitation instead of immediate access.

## Remove

This is access removal. Only do it when explicitly requested:

```sh
gh api --method DELETE repos/OWNER/REPO/collaborators/USERNAME
```

## Verify

```sh
gh api repos/OWNER/REPO/collaborators --jq '.[].login'
```

## Do not

- Do not bypass KakkoiSchool organization teams/policies with ad-hoc collaborator changes.
- Do not assume an invitation has been accepted merely because the API call succeeded.
