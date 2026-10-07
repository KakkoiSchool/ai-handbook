# Student setup checks

These scripts **only inspect** the student's setup. They do not install software or change configuration.

The AI should first read [`../recipes/student-setup.md`](../recipes/student-setup.md).

## macOS / Linux

From the handbook repository:

```sh
sh setup/check-setup.sh
```

## Windows PowerShell

```powershell
powershell -ExecutionPolicy Bypass -File setup/check-setup.ps1
```

The scripts check:

- Git installed;
- GitHub CLI installed;
- GitHub authentication active;
- Git commit name configured;
- Git commit email configured.

They deliberately do not display authentication tokens.


## 12. Prove the whole workflow

After all setup checks pass, follow [first-project.md](first-project.md).

That final exercise verifies the complete student workflow:

```text
local files → localhost → Git commit → GitHub → GitHub Pages
```

Do not consider first-day setup complete until the student has either finished that path or deliberately chosen to stop before publishing.
