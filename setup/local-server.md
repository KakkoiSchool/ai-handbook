# What is a local server?

## Goal

Give a beginner enough of the web model to understand Live Server, `localhost`, ports, and GitHub Pages.

## Files are not a website server

Suppose the project is:

```text
my-game/
├── index.html
├── style.css
└── game.js
```

Double-clicking `index.html` may open:

```text
file:///Users/student/my-game/index.html
```

The browser is reading a file directly from disk.

That works for very simple pages, but browser features involving modules, requests, routes, origins, and security rules can behave differently or fail.

## Live Server adds HTTP

When Live Server starts, it runs a small program on the computer that listens for browser requests.

For example:

```text
Browser
   |
   | GET /index.html
   v
Live Server on localhost:5500
   |
   | reads file
   v
index.html on disk
   |
   | HTTP response
   v
Browser
```

Now the page has an HTTP URL:

```text
http://localhost:5500/
```

## What is localhost?

`localhost` means:

> this computer.

It normally resolves to the loopback address `127.0.0.1`.

If a student's laptop opens:

```text
http://localhost:5500/
```

it is talking back to a server running on **that same laptop**.

Another person on the internet cannot use that URL to reach the student's machine.

## What is the port?

A computer can run many network services at once. A **port** is like a numbered door.

```text
localhost:5500
          ^^^^
          port
```

Live Server commonly chooses 5500, but it can use another available port.

## What is live reload?

Live Server watches project files.

When the student saves a file:

```text
save file
   ↓
Live Server notices change
   ↓
browser receives reload signal
   ↓
new HTML/CSS/JS appears
```

That tight feedback loop is why it is pleasant for beginner web development.

## Local server versus GitHub Pages

```text
DEVELOPMENT

student computer
  → Live Server
  → localhost
  → only local testing


PUBLISHING

git push
  → GitHub repository
  → GitHub Pages server
  → public HTTPS URL
  → classmates / phones / anyone with access
```

A local server and a production/public server both speak HTTP, but they run in different places and serve different purposes.

## Why students should learn this distinction

It explains several common questions:

- "Why can I see it but my friend cannot?"
  - because `localhost` means each person's own machine.
- "Why did double-clicking HTML break my JavaScript import?"
  - because `file://` is not the same environment as HTTP.
- "Why isn't my GitHub Pages site updated when Live Server updates?"
  - because Live Server reads local files; Pages reads the files deployed from GitHub.
- "Why do I need to push?"
  - because GitHub cannot publish changes that still exist only on the student's computer.
