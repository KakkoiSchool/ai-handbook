# Create a local project

## Goal

Create a small local project folder with Git history before publishing it.

## Preferred path

```sh
mkdir my-project
cd my-project
git init
printf '# My project\n' > README.md
git add README.md
git commit -m "Start project"
```

If Git asks for an identity, configure the student's own name/email. Do not invent them.

## Verify

```sh
git status
git log --oneline -1
```

Expected: clean working tree and one initial commit.

## Do not

- Do not add React, npm, a build system, or a framework unless the project requires it.
- Do not create a remote repository unless the student asked to publish it.
