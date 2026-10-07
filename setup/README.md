# Set up a computer for Kakkoi School

This is the canonical first-time setup route.

If the student says anything like "set up my computer", "install what I need", or "get me ready for Kakkoi School", follow this page in order.

Install only what is missing.

## 1. GitHub account

Ask whether the student already has a GitHub account.

If not, follow [github-account.md](github-account.md) and help them create one safely.

Do not continue to GitHub authentication until the account exists and its email is verified.

## 2. Check the current computer

If this repository is available locally, run the read-only health check.

macOS / Linux:

    bash setup/check-setup.sh

Windows PowerShell:

    powershell -ExecutionPolicy Bypass -File setup/check-setup.ps1

If the repository is not local yet, check individually:

    git --version
    gh --version
    code --version

Missing commands determine which steps are needed.

## 3. Git

If Git is missing, follow [git.md](git.md).

Do not replace an already working Git installation just because another installer is preferred.

## 4. GitHub CLI and authentication

If gh is missing, follow [../recipes/github-cli.md](../recipes/github-cli.md).

Authenticate with the browser flow:

    gh auth login --web
    gh auth setup-git
    gh auth status

Never ask the student to paste a password, 2FA code, token, recovery code, or cookie into chat.

## 5. Git identity

Inspect:

    git config --global user.name
    git config --global user.email

If either is missing, ask the student what name/email they want on commits. Do not invent them.

Then verify the values after setting them.

## 6. VS Code

If VS Code is missing, follow [vscode.md](vscode.md).

Then follow [vscode-github.md](vscode-github.md) for GitHub integration when needed.

## 7. Coding AI

Follow [copilot.md](copilot.md) for the supported GitHub Copilot setup and student/free options.

The coding AI should be able to read this repository and route itself using the root AGENTS.md.

## 8. Local web preview

For simple browser projects, install/use Live Server as described in [live-server.md](live-server.md).

If the student asks what localhost means, use [local-server.md](local-server.md).

## 9. Optional GitHub Education

If relevant, follow [github-education.md](github-education.md).

This is useful but is not required before the student can begin coding.

## 10. Final check

Verify:

    git --version
    gh --version
    gh auth status
    git config --global user.name
    git config --global user.email

Also verify VS Code opens successfully.

## 11. Prove the workflow

Finish with [first-project.md](first-project.md).

That verifies:

    edit locally
      ↓
    localhost
      ↓
    Git commit
      ↓
    GitHub
      ↓
    GitHub Pages
      ↓
    public site

Only then is the first-day setup proven end-to-end.
