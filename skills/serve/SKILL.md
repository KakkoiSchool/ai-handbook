---
name: serve
description: Start a local development server for a named Kakkoi School project and verify that it loads.
---

# /serve PROJECT

## Goal

Start the student's project locally with the simplest server the project already supports, then give the student the local URL.

Examples:

```text
/serve my-game
/serve ./projects/cat-game
/serve .
```

## 1. Resolve the project

Treat everything after `/serve` as the project name or path.

1. If it is an existing path relative to the current workspace, use it.
2. Otherwise look only within the current workspace for an exact directory-name match.
3. If there is more than one exact match, show the matches and ask which one.
4. If there is no match, ask where the project is. Do not search the student's entire home directory.
5. If no argument was supplied and the current workspace is clearly one project, use the current project.

Before starting anything, read local `AGENTS.md`, `CLAUDE.md`, `README.md`, and obvious project instructions when present.

## 2. Prefer the project's own development command

If the project documents a development server, use it.

For JavaScript projects, inspect `package.json` scripts. Prefer an existing script such as:

```text
dev
serve
start
preview
```

Use the package manager already selected by the project lockfile. Do not replace the project's toolchain.

Do not install dependencies silently. If the documented command needs missing dependencies, explain what is missing and ask before downloading/installing them.

## 3. Static-site fallback

If this is a plain HTML/CSS/JS project with no documented server, use an already-installed local server. Prefer **no new dependency**.

Use port `8000` first. If it is already in use, try `8001`, `8002`, and so on.

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
python3 -m http.server 8000 --bind 127.0.0.1 --directory "PROJECT"
```

Then, if needed:

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory "PROJECT"
php -S 127.0.0.1:8000 -t "PROJECT"
ruby -run -e httpd "PROJECT" -p 8000 -b 127.0.0.1
```

### Windows

Check:

```powershell
Get-Command py, python, python3 -ErrorAction SilentlyContinue
```

Preferred:

```powershell
py -3 -m http.server 8000 --bind 127.0.0.1 --directory "PROJECT"
```

Fallback:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory "PROJECT"
```

If none of the no-install options are available but Node is installed, explain that an `npx` fallback may download a package and get approval before using it.

## 4. Keep it local by default

Bind to `127.0.0.1`, not `0.0.0.0`.

A local development server is not publishing. Do not expose the student's machine to the network unless they explicitly ask.

## 5. Verify

Open or request the page at:

```text
http://127.0.0.1:PORT/
```

Verify:

- the server responds;
- the expected page renders;
- the browser console has no blocking startup error.

If the project has a different documented entry path, verify that path instead.

Do not say the project is running merely because the server process started.

## 6. Tell the student

Report:

- project name/path;
- exact local URL;
- which command is running;
- how to stop it (normally `Ctrl+C` in the server terminal).

Keep the server running when the environment supports a long-running foreground/background process and the student is actively using it.

## Do not

- Do not add Vite, React, npm, or another framework just to serve static files.
- Do not install a server package when Python or another existing server is enough.
- Do not bind publicly by default.
- Do not ignore the project's documented development command.
