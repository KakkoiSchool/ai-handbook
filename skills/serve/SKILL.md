---
name: serve
description: Start a local development server for a named student project, using the project's own dev command when defined or an already-available simple HTTP server otherwise.
---

# /serve

## Goal

Given a project name or path, start its local development server and give the student a working local URL.

Examples:

```text
/serve my-game
/serve projects/cat-site
```

The student should not need to know which server command is appropriate.

## 1. Find the project

Treat the argument after `/serve` as a project name or path.

Resolve it from the current workspace/home projects without guessing between multiple matches.

If exactly one obvious project matches, use it.

If multiple projects have the same or similar name, show the short choices and ask which one.

Before serving, inspect the project's own instructions when present:

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `package.json`
- other clearly named project instructions

A project's documented development command takes priority over generic serving.

## 2. Prefer the project's existing dev server

If the project already defines and documents a development command, use it.

Common examples include:

```sh
npm run dev
npm start
npm run serve
```

Do not run `npm install` automatically just because a package manifest exists. If required dependencies are missing, explain that first.

Do not replace an existing development workflow with Python merely because Python is installed.

## 3. Static-project fallback

For a plain static HTML/CSS/JS project with no project-specific dev command, prefer an already installed Python 3:

```sh
python3 -m http.server PORT --directory PROJECT_PATH
```

Start with port `8000`. If it is already occupied, try the next reasonable available port rather than killing an unrelated process.

If `python3` is unavailable, use the first already-installed suitable option:

### Python

```sh
python -m http.server PORT --directory PROJECT_PATH
```

Only use this when `python --version` confirms Python 3.

### PHP

From the project directory:

```sh
php -S 127.0.0.1:PORT
```

### Ruby

From the project directory:

```sh
ruby -run -e httpd . -p PORT
```

### Existing editor/server tooling

If the student's environment already provides a local server such as VS Code Live Server, it is also acceptable when it is the established project workflow.

Do not install a new server package merely to satisfy `/serve` when one of the options above is already available.

## 4. Keep the server manageable

Prefer a foreground terminal/session that the student can see and stop with `Ctrl+C`.

If the agent environment requires a background process:

- keep track of the PID/session;
- do not create an orphan process;
- tell the student how to stop it.

Bind to `127.0.0.1` / localhost by default. Do not expose the student's development server to the LAN or internet unless they explicitly ask.

## 5. Determine the URL

For a normal static project, the URL will usually be:

```text
http://localhost:8000/
```

Use the actual port selected by the server.

If the project uses a sub-path or its own dev server prints a different URL, use that instead.

## 6. Verify

Do not say the server is working merely because the process started.

Verify at least one of:

```sh
curl -I http://localhost:PORT/
```

or open the URL in a browser and confirm the expected page loads.

Also check the browser console when the task involves JavaScript modules or a game.

Report:

- project served;
- exact local URL;
- server command used;
- how to stop it.

## Do not

- do not silently serve the wrong similarly named project;
- do not kill another process just to reclaim port 8000;
- do not install a framework or package manager;
- do not expose the server on `0.0.0.0` unless explicitly requested;
- do not claim success before the URL responds;
- do not confuse localhost with a public deployment.

For the localhost model, see [../../setup/local-server.md](../../setup/local-server.md).
