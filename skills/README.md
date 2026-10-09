# Kakkoi School skills

Skills are short reusable workflows routed by the root [AGENTS.md](../AGENTS.md).

Students should be able to use them directly without knowing how they work.

## Available skills

| Command | Purpose |
|---|---|
| `/serve PROJECT` | Start and verify a local development server for a project |
| `/publish PROJECT` | Put a project on GitHub and publish it with the project's appropriate GitHub Pages path |

The word after the command is a project name or path. If omitted and the current workspace is clearly the intended project, use the current project.

These skills are orchestration instructions, not new frameworks. Reuse the project's own commands and the existing Kakkoi recipes instead of replacing them.

## Creating another skill

When a student completes a genuinely new, repeatable multi-step workflow, the agent should briefly offer to save it as a skill.

Do not create a skill automatically. If the student accepts:

1. identify the AI agent/harness being used;
2. use that agent's supported skill format and location;
3. keep the skill narrow and task-oriented;
4. point to authoritative existing documentation rather than copying it;
5. include a concrete verification step.

For workflows maintained centrally by Kakkoi School, use this repository's `skills/<name>/SKILL.md` convention.
