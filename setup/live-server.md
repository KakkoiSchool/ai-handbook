# Install and use Live Server in VS Code

## Goal

Open a static web project through a local HTTP server and automatically refresh the browser when files change.

The extension is **Live Server** by Ritwick Dey.

Marketplace:
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

Extension ID:

```text
ritwickdey.LiveServer
```

## Install from VS Code

1. Open **Extensions**.
2. Search for:
   `Live Server`
3. Check that the extension ID is:
   `ritwickdey.LiveServer`
4. Install it.

## Install from the terminal

```sh
code --install-extension ritwickdey.LiveServer
```

## Start a site

1. Open the **project folder** in VS Code.
2. Make sure it contains `index.html`.
3. Click **Go Live** in the VS Code status bar.

Or right-click `index.html` and choose **Open with Live Server**.

Live Server normally opens an address resembling:

```text
http://127.0.0.1:5500/
```

or:

```text
http://localhost:5500/
```

The exact port can differ.

## What Live Server gives you

- an HTTP server on the student's computer;
- automatic browser opening;
- live reload when files are saved;
- web behavior closer to a real deployed site than opening `file:///.../index.html` directly.

## Stop it

Click the Live Server status-bar control again or use the Command Palette command:

**Live Server: Stop Live Server**

## Important

**Live Server does not publish the website to the internet.**

It is a local development tool.

For a public website, use:
[../recipes/github-pages.md](../recipes/github-pages.md)
