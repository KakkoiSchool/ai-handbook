---
name: serve
description: Start a local development server for a named student project, using the project's own dev command when defined or an already-available simple HTTP server otherwise.
---

# /serve PROJECT

## Goal

Given a project name or path, start its local development server and give the student a **verified local URL**.

Examples:

```text
/serve my-game
/serve projects/cat-site
/serve .
```

The student should not need to know which server command is appropriate.

## 1. Find the project

Treat everything after `/serve` as the project name or path.

1. If it is an existing path relative to the current workspace, use it.
2. Otherwise search only the current workspace for an exact directory-name match.
3. If multiple exact matches exist, show the short choices and ask which one.
4. If no match exists, ask where the project is. Do not crawl the student's whole home directory.
5. If no argument was supplied and the current workspace is clearly one project, use the current project.

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

Use the package manager already selected by the project lockfile.

Do not run `npm install`, `pnpm install`, or another network install automatically just because a package manifest exists. If required dependencies are missing, explain that first and get approval before downloading them.

Do not replace an existing development workflow with Python merely because Python is installed.

## 3. Static-project fallback

For a plain HTML/CSS/JS project with no project-specific dev command, prefer an already installed local server. Do not add a dependency merely to serve files.

Start with port `8000`. If it is occupied, try `8001`, `8002`, and so on rather than killing an unrelated process.

### macOS / Linux

Check in this order:

```sh
command -v python3
command -v python
command -v php
command -v ruby
```

Preferred:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory "PROJECT_PATH"
```

Then, if needed:

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory "PROJECT_PATH"
php -S 127.0.0.1:8000 -t "PROJECT_PATH"
ruby -run -e httpd "PROJECT_PATH" -p 8000 -b 127.0.0.1
```

Only use `python` after confirming it is Python 3.

### Windows

Check:

```powershell
Get-Command py, python, python3 -ErrorAction SilentlyContinue
```

Preferred:

```powershell
py -3 -m http.server 8000 --bind 127.0.0.1 --directory "PROJECT_PATH"
```

Fallback:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory "PROJECT_PATH"
```

If none of these no-install options exist but Node is installed, explain that an `npx` fallback may download a package and ask before using it.

Existing VS Code Live Server is also acceptable when it is already the student's established workflow.

## 4. Keep it local

Bind to `127.0.0.1` / localhost by default.

A local development server is **not publishing**. Do not expose the student's computer on `0.0.0.0`, the LAN, or the internet unless they explicitly ask.

Prefer a visible foreground terminal/session the student can stop with `Ctrl+C`.

If the agent environment requires a background process:

- keep track of the PID/session;
- do not create an orphan process;
- tell the student how to stop it.

## 5. Verify

Use the actual URL printed by the project server. For the static fallback it is normally:

```text
http://127.0.0.1:8000/
```

Verify:

- the server responds;
- the expected page renders;
- for JavaScript apps/games, the browser console has no blocking startup error.

Use a browser when available. A simple HTTP check such as this is also useful:

```sh
curl -I http://127.0.0.1:PORT/
```

Do not say the project is running merely because the process started.

## 6. Tell the student

Report only what is useful:

- project served;
- exact local URL;
- server command used;
- how to stop it.

## Do not

- do not silently serve the wrong similarly named project;
- do not kill another process just to reclaim port 8000;
- do not install a framework or package manager;
- do not install a server package when an existing local server is enough;
- do not bind publicly by default;
- do not ignore the project's documented development command;
- do not claim success before the URL responds;
- do not confuse localhost with a public deployment.

For the localhost model, see [../../setup/local-server.md](../../setup/local-server.md).
