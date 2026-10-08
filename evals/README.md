# AI Handbook evaluation suite

Purpose: test whether a relatively weak coding assistant can use this repository without inventing GitHub workflows.

The model under test should receive only:

1. the student's prompt;
2. the URL of this repository;
3. permission to read the repository.

It should **not** receive a hidden explanation of which recipe to open.

## What we score

Each case has:

- **must** — facts/actions the answer must include;
- **must_not** — common hallucinations or unsafe shortcuts;
- **recipe** — the handbook page the model should discover;
- **verification** — how it should prove completion.

The important question is not whether the model knows GitHub already. It is whether it can **route to the handbook and follow it**.

## Suggested models

Use at least:
- one small/fast model;
- one mid-range model;
- one stronger model as a control.

Use low or default reasoning settings for the weak-model run.

## Run manually

Give the model a prompt from `cases.json`, followed by:

> Before answering, read https://github.com/KakkoiSchool/ai-handbook and follow the relevant recipe exactly. Do not rely on your memory if the handbook covers the task.

Save the response as a text file, then score it:

```sh
python3 evals/score.py evals/cases.json CASE_ID response.txt
```

This scorer checks obvious required/forbidden strings. A human should still inspect whether the operational sequence makes sense.

## Stronger test

After the basic suite passes, remove the explicit “read the handbook first” sentence and give only:

> Use https://github.com/KakkoiSchool/ai-handbook to help me with this.

That tests whether the README routing is clear enough by itself.

## Manual bootstrap smoke test

Put only [../bootstrap/AGENTS.md](../bootstrap/AGENTS.md) in a fresh project. Confirm the actual agent recognizes it; ask for a website, a game, and publication and verify distinct remote routes. Switch with `日本語でお願いします` and `Please answer in English`. Then disable network access: the agent must acknowledge it cannot read the current online handbook. Static validation does not prove a model fetched pages.
