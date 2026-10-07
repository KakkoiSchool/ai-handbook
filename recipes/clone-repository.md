# Clone a repository

## Goal

Copy an existing GitHub repository to the student's computer.

## Preferred path

```sh
gh repo clone OWNER/REPO
cd REPO
```

Plain Git fallback:

```sh
git clone https://github.com/OWNER/REPO.git
cd REPO
```

## Verify

```sh
git remote -v
git status
git log --oneline -1
```

## Do not

Do not clone a similarly named repository because the requested one was private or inaccessible. Report the access problem.
