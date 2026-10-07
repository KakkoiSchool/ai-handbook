# Releases

## Goal

Publish a named GitHub release from a Git tag.

## Inspect existing releases

```sh
gh release list -R OWNER/REPO
```

## Create

A simple generated-notes release:

```sh
gh release create v1.0.0 -R OWNER/REPO --generate-notes
```

Add a title when useful:

```sh
gh release create v1.0.0 -R OWNER/REPO --title "v1.0.0" --generate-notes
```

## Verify

```sh
gh release view v1.0.0 -R OWNER/REPO
```

## Do not

Do not reuse an existing version tag for different code. Choose a new version.
