# Kakkoi School skills

Skills are short, reusable workflows an AI can invoke for a student.

The student should not need to know where the implementation lives. They can use a command-like request such as:

```text
/serve my-game
/publish my-game
```

The online router in the repository root decides which skill to read.

## Available skills

| Skill | Purpose |
|---|---|
| [`/serve`](serve/SKILL.md) | Start a project's local development server and open/verify its local URL |
| [`/publish`](publish/SKILL.md) | Take a project from local files to a verified public GitHub Pages URL |

## When an AI should propose a new skill

After completing a **new, repeatable workflow** successfully, briefly tell the student that it can be turned into a skill.

Suggested wording:

> This is a repeatable workflow. We can save it as a skill such as `/name` so next time you can just ask for that. Want me to add it?

Do this only when the workflow is genuinely reusable. Do not interrupt the workflow to discuss optimization.

Do not create the skill without the student's approval.

Before proposing a new skill:

1. check whether the project or this handbook already has a matching skill or recipe;
2. prefer extending an existing skill over creating a near-duplicate;
3. keep project-specific skills in that project when possible;
4. put generally useful Kakkoi School workflows here.

A skill should be procedural and small. Prefer:

1. Goal
2. Invocation
3. Detect/context
4. Preferred path
5. Fallbacks
6. Verify
7. Do not

Do not turn documentation into another framework or abstraction layer. A skill should route the AI toward existing tools and authoritative documentation whenever possible.
