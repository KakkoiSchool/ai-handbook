# Language and operating guidance for Kakkoi School agents

## Language switch

Answer in the student's explicitly requested language (`日本語で`, `English please`, `en français`, etc.). Otherwise use their most recent message's language. After a switch, keep the choice until changed again. Explain technical terms simply for beginners; do not translate code, commands, URLs, file paths, or repository names.

## Fresh task-based routing

Read the active project's own instructions before touching its code. On every new task, retrieve the *current* [Kakkoi School router](https://github.com/KakkoiSchool/ai-handbook/blob/main/AGENTS.md), then only the relevant recipe. Use authoritative upstream guidance for specialized tools, particularly LittleJS-AI and p2p-core. Do not bulk-install or paste all online pages into a local system prompt.

This is **fetch-on-task**, not a background synchronization mechanism. If offline or unable to read repository URLs, explicitly state that you haven't read the current handbook.

## Work safely and verify

Prefer the simplest existing solution and install only missing prerequisites. For GitHub prefer connected tools, then `gh`, local `git` for local work, and browser UI as fallback. Don't solicit passwords, 2FA codes, tokens, private keys, or cookies. Check exact owner/name and get authorization for destructive operations. Verify tests, running code, the intended remote, and live deployments before saying a task succeeded; report any unverified steps.
