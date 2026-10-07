# Install Visual Studio Code

## Goal

Install the code editor used in the beginner Kakkoi School workflow.

Official download:
https://code.visualstudio.com/

Official getting-started guide:
https://code.visualstudio.com/docs/getstarted/overview

## Windows

Microsoft recommends the **User Setup** installer for most students because it does not require administrator privileges.

1. Download VS Code for Windows.
2. Run the User Setup installer.
3. Follow the installer.
4. Open VS Code.

The Windows installer normally adds `code` to PATH.

Check:

```powershell
code --version
```

Official guide:
https://code.visualstudio.com/docs/setup/windows

## macOS

1. Download the macOS `.dmg`.
2. Open it.
3. Drag **Visual Studio Code.app** into **Applications**.
4. Open VS Code.

To enable `code .` from Terminal:

1. press **Cmd+Shift+P**;
2. search for **Shell Command: Install 'code' command in PATH**;
3. run it;
4. reopen Terminal.

Then:

```sh
code --version
```

Official guide:
https://code.visualstudio.com/docs/setup/mac

## Linux

Use the official package for the distribution.

Debian/Ubuntu example:

```sh
sudo apt install ./<downloaded-vscode-file>.deb
```

Snap is also officially distributed:

```sh
sudo snap install --classic code
```

Official guide:
https://code.visualstudio.com/docs/setup/linux

## Open a project folder

From the terminal:

```sh
cd path/to/project
code .
```

Or in VS Code:

**File → Open Folder…**

For web projects, open the **project folder**, not only one HTML file. Extensions such as Live Server and Git source control operate more predictably when VS Code knows the project root.

## Essential beginner UI

The student only needs a few areas at first:

- **Explorer** — project files;
- **Search** — search project text;
- **Source Control** — Git changes/commits;
- **Terminal** — commands such as `git` and `gh`;
- **Extensions** — install Live Server;
- **Copilot/Chat** — AI coding help if enabled.

Do not load beginners with a large extension pack.
