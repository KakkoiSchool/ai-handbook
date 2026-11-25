# Add an AI feature to a project

## Goal

Add a model-powered feature with a clear input, a validated result, and behavior the student can verify when the model is unavailable.

## Start with a small model call

1. Use the provider or local model the project already supports. Keep shared provider credentials server-side. Decide what project data the provider needs to receive.
2. Define a small expected output shape and validate the response before you show or use it. Treat content fetched from feeds or pages as input data.
3. Set a timeout and a bounded retry policy. Give the person using the app a useful fallback or a clear error. Test success, malformed output, and timeout with a stub.

[mainichi-news](https://github.com/KakkoiSchool/mainichi-news) is a worked example. Its news digest gives the model numbered articles, reads the chosen IDs from structured output, and takes links from the original feed records. A failed model call can fall back to a headline-only digest. Use its preview command before connecting a real inbox. Use a fixture to test the validation and fallback without calling a live provider.

## Add AI Core when the project runs an agent

For a Node.js tool-using agent or local-model harness, see the [AI Core integration guide](https://github.com/KakkoiDev/ai-core/blob/v0.4.1/docs/integration.md). Adopt the specific policy you need, such as a progress timeout, bounded recovery, or action receipts. Use [the v0.4.1 package exports](https://github.com/KakkoiDev/ai-core/blob/v0.4.1/package.json) to check that the pinned version supplies the import you need.

The host still validates and authorizes actions. For actions that can change data or send messages, persist the operation ID, and check the external result before repeating an action that may have run. Test a timeout after a fake tool action and verify that completing recovery leaves a single effect.
