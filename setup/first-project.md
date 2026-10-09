# First project: local page → GitHub → GitHub Pages

## Goal

Give a new student one complete success path after setup.

At the end, the student has:

- a tiny HTML project on the computer;
- a Git commit;
- a GitHub repository;
- a local Live Server preview;
- a public GitHub Pages URL.

## 1. Create the folder

Choose a simple repository name, for example `hello-site`.

```sh
mkdir hello-site
cd hello-site
```

Create `index.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hello</title>
</head>
<body>
  <h1>Hello from Kakkoi School!</h1>
</body>
</html>
```

Do not add a framework, npm, or a build step for this first project.

## 2. Connect the local agent

Follow [agent.md](agent.md). For a new project using project-scoped instructions, copy [../bootstrap/AGENTS.md](../bootstrap/AGENTS.md) into this folder as `AGENTS.md`, unless one already exists. If the student already has global instructions, do not duplicate them. Confirm the agent recognizes the URL and honors a language switch.

## 3. Start Git

```sh
git init
git add index.html
# If you created a project AGENTS.md, also run: git add AGENTS.md
git commit -m "Create first website"
```

If Git refuses because the author identity is missing, follow [git.md](git.md). Ask the student which name/email to use; do not invent one.

## 3. Test locally with the first reusable skill

Teach the student the shortcut:

```text
/serve hello-site
```

Follow [../skills/serve/SKILL.md](../skills/serve/SKILL.md).

The skill should start the simplest appropriate local server and verify that **Hello from Kakkoi School!** is visible.

If the student does not understand localhost, read [local-server.md](local-server.md).

## 4. Publish with the second reusable skill

Teach the student:

```text
/publish hello-site
```

Follow [../skills/publish/SKILL.md](../skills/publish/SKILL.md).

The publish skill handles the remaining path:

```text
choose/verify GitHub owner
        ↓
create/connect repository
        ↓
commit + push
        ↓
configure GitHub Pages
        ↓
open and verify public URL
```

If the intended owner is unclear, ask whether the project belongs to the student's account or `KakkoiSchool`. Never silently substitute one for the other.

Only tell the student the site is live after the public Pages URL has actually been opened and verified.

## What the student has learned

```text
edit locally
   ↓
/serve PROJECT
   ↓
verified localhost
   ↓
/publish PROJECT
   ↓
GitHub repository + Pages
   ↓
verified public site
```

That loop is the base workflow for later Kakkoi School web projects.
