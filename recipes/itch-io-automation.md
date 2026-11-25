# Automate itch.io builds or read project data

## Goal

Use itch.io's supported tools for repeat uploads, release automation, or account and build queries. For an account, draft project page, and first upload, start with [Publish a game on itch.io](itch-io.md).

## Repeat uploads with the itch app or Butler

1. Identify the existing project, build output, and intended channel. A project URL like `https://username.itch.io/my-game` becomes `username/my-game` for Butler. Keep one stable channel per target, such as `html5`, `windows`, `osx`, or `linux`. Reusing the channel updates that build; a new channel creates a separate slot.
2. **GUI:** In the [itch desktop app](https://itch.io/app), sign in and open **Upload**. Choose **Push new build**, select the project and channel, optionally enter a version, and select the folder or ZIP. Preview the file changes before pushing. See the [official app upload walkthrough](https://itch.io/updates/pushing-builds-with-butler-is-now-in-the-itch-app).
3. **CLI:** Install [Butler](https://itch.io/docs/butler/installing.html), then run these commands with the actual build folder and target. The student authorizes the login in the browser.

   ```sh
   butler version
   butler login
   butler push ./dist username/my-game:html5 --userversion 1.0.0
   ```

4. For the first browser push, edit the game page, set the project to HTML, mark the channel as playable in the browser, and save. Check the build state in the app or edit page, then play or download the intended build. A push to an existing public channel can replace the live build as soon as it processes. Practice on a draft project before using a public channel. See [Butler push](https://itch.io/docs/butler/pushing.html).

## CI releases

1. Reproduce the build and push manually first. In CI, install Butler from its [documented download service](https://itch.io/docs/butler/installing.html#automation-friendly-way), build, and test the release files.
2. Create the CI secret `BUTLER_API_KEY` using the credential described in [Butler's CI guide](https://itch.io/docs/butler/login.html#running-butler-from-ci-builds-github-actions-gitlab-ci-etc). Set it only for the upload step. The student sets secrets directly in the CI settings.
3. Start with a manually triggered release job that pushes to the confirmed target. Use the project's release version, inspect the build state, and verify the live URL. When testing release automation use a draft project or an explicitly hidden upload, never assume a channel named `beta` is private.

## API and agents

| Task | Supported tool |
|---|---|
| Upload builds | Butler CLI or itch app. Use the dashboard for page metadata, visibility, pricing, and jam submissions. |
| Read your profile or owned project list | [Server-side API](https://itch.io/docs/api/serverside), using `GET /profile` or `GET /profile/games` and a bearer API key. Keep it out of browser game code. |
| Access another user's data with consent | [OAuth](https://itch.io/docs/api/oauth), requesting only the needed scopes. |
| Look up a public channel's latest release version | `GET /wharf/latest` on `api.itch.io` with `target=username/my-game&channel_name=html5`. This needs no key. Supply `--userversion` on upload if you want a version returned. |
| Follow new releases or embed a project card | [RSS feeds and widgets](https://itch.io/docs/api/overview). |

To try the profile API, generate a key from the settings link in the official reference, set it in your local environment as `ITCH_API_KEY`, and run:

```sh
curl -fsS -H "Authorization: Bearer ${ITCH_API_KEY:?Set ITCH_API_KEY locally}" \
  https://api.itch.io/profile/games
```

Check the returned JSON for `errors` as well as HTTP status. For game launchers and library/install integration, see itch.io's [butlerd guide](https://itch.io/docs/butler/launcher-integration.html).

No official publishing MCP was found in itch.io's docs. For a coding agent, use Butler via its terminal capability and the web dashboard for the page. If a project needs MCP later, start with the exact read-only operation it needs, such as checking a public channel version. Third-party asset search servers serve a different workflow and do not need creator credentials.
