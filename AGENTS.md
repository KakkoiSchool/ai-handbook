# Kakkoi School AI router

Online task router; the *short local starter* is [bootstrap/AGENTS.md](bootstrap/AGENTS.md). Never copy the full handbook into each student project.

You are helping a Kakkoi School student.

The student may give you only this repository URL and a short request. Your first job is to identify the task and route yourself to the right instructions.

Do not make the student choose a recipe or documentation file for you.

## 0. Language and freshness

Follow [references/agent-behavior.md](references/agent-behavior.md). Use the student's chosen language or most recent message's language and switch whenever asked. For each new task fetch current relevant remote instructions; if they cannot be read, disclose that rather than claiming they are current.

## 1. Existing project instructions come first

If you are working inside an existing repository, first inspect its local instructions when present:

- AGENTS.md
- CLAUDE.md
- README.md
- other clearly named project instructions

Preserve the project's existing architecture unless the student explicitly asks to change it.

Then use this repository for cross-project operations such as GitHub, publishing, multiplayer, or Kakkoi School conventions.

## 2. Route by intent

| Student intent | Read next |
|---|---|
| Set up/install everything, new computer, missing Git/GitHub/VS Code | [setup/README.md](setup/README.md), including [local agent setup](setup/agent.md) |
| Set up local agent file or switch language | [setup/agent.md](setup/agent.md) and [references/agent-behavior.md](references/agent-behavior.md) |
| Create or modify a browser game | [recipes/games.md](recipes/games.md) |
| Create/clone/rename/delete a repository, commit, branch, PR, issue, release, collaborator | [recipes/README.md](recipes/README.md) |
| Start a project's local dev server or use `/serve PROJECT` | [skills/serve/SKILL.md](skills/serve/SKILL.md) |
| Publish a project or use `/publish PROJECT` | [skills/publish/SKILL.md](skills/publish/SKILL.md) |
| Publish/configure GitHub Pages directly | [recipes/github-pages.md](recipes/github-pages.md) |
| Add multiplayer | [recipes/multiplayer.md](recipes/multiplayer.md) |
| Browser/UI fallback for GitHub | [recipes/browser-fallback.md](recipes/browser-fallback.md) |
| Ordinary work in an existing project | Follow that project's own instructions |

A task can use more than one route. For example, making a multiplayer game means use the game instructions for the game and the multiplayer recipe for networking.

## 3. Browser games: hand off to LittleJS-AI

For a new browser game, Kakkoi School uses **LittleJS**.

Do not reconstruct LittleJS guidance from memory and do not maintain a second LittleJS handbook here.

Read and follow:

https://github.com/KilledByAPixel/LittleJS-AI

Start with its README.md and AGENTS.md, then use its relevant skills, templates, helpers, and API reference.

That upstream repository is the source of truth for LittleJS game creation.

If an existing project already uses another engine, preserve it unless the student explicitly asks to migrate.

## 4. GitHub capability order

For GitHub-side operations, use the first available option:

1. native connected GitHub tool/API;
2. GitHub CLI (gh);
3. local git for local Git operations;
4. browser UI / safe Playwright fallback.

Do not invent another workflow when a repository recipe already covers the operation.

## 5. Verify before claiming success

Verify the actual outcome:

- repository exists at the intended owner/name;
- push reached the intended remote;
- PR is open or merged as requested;
- Pages URL loads;
- game renders and controls work;
- multiplayer works in the intended environment.

Do not say done until the relevant user-visible result is verified.

## 6. Authentication and secrets

Never ask a student to paste passwords, 2FA codes, GitHub tokens, recovery codes, private keys, or session cookies into chat.

Prefer GitHub browser authentication:

    gh auth login --web
    gh auth setup-git
    gh auth status

## 7. KakkoiSchool ownership

KakkoiSchool/project is not interchangeable with a student's personal repository.

If the student asks for a KakkoiSchool repository and lacks permission, report the permission problem. Do not silently create a personal substitute.

## 8. Prefer existing layers

Before adding a dependency, framework, helper, or abstraction, check whether the current project or its authoritative documentation already solves the problem.

For Kakkoi School browser games:

- game engine and game helpers → LittleJS / LittleJS-AI;
- multiplayer → KakkoiDev/p2p-core;
- repository/deployment → the GitHub recipes here.

Do not create a Kakkoi-specific wrapper around an upstream library without a demonstrated need.


## 9. Make repeatable workflows discoverable

Kakkoi School skills live under [skills/](skills/README.md).

When a student writes a command-like request such as `/serve PROJECT` or `/publish PROJECT`, read and follow the matching skill.

After a student successfully completes a **new workflow that is likely to be repeated**, briefly point out that it can be saved as a skill so next time the workflow can be invoked directly.

For example:

> This is a repeatable workflow. We can save it as a skill such as `/name` so next time you can just ask for that. Want me to add it?

Rules:

- suggest this only after the current workflow succeeds;
- do not interrupt active work with optimization discussion;
- do not create a skill without the student's approval;
- first check whether this repository or the current project already has a matching skill/recipe;
- prefer extending an existing skill over creating a near-duplicate;
- keep project-specific skills with that project when possible;
- keep generally useful Kakkoi School skills in this handbook.

The purpose is to show students that repeated work can be optimized, not to create a new abstraction for every task.
