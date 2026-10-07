# Fork a repository

## Goal

Create a GitHub fork, normally so the student can experiment or propose changes without write access to the original.

## Preferred path

```sh
gh repo fork OWNER/REPO --clone
```

Without cloning:

```sh
gh repo fork OWNER/REPO
```

## Verify

```sh
gh repo view --json nameWithOwner,parent,url
```

## Do not

Do not fork merely because pushing to the original failed. First determine whether the student was supposed to have write access.
