# Publish a game on itch.io

## Goal

Help a student prepare a game, preview it on itch.io, and verify that people can play or download the published build. Use the web dashboard for the first release. For repeat builds, CI, API access, or agent integration, open [itch.io automation](itch-io-automation.md) when needed.

## 1. Create the account

1. Open [itch.io registration](https://itch.io/register). Choose a username you are comfortable using publicly. It becomes the account's `username.itch.io` address.
2. Enter your email and password in the registration form, complete the requested checks, and submit it. Open the verification email and follow the confirmation link.
3. Sign in and open the [creator dashboard](https://itch.io/dashboard). Check that the current account is the owner you intend to publish under. The student handles sign-in and email verification directly. See [account two-factor authentication](https://itch.io/docs/advanced/two-factor-authentication) if they want to enable it.

## 2. Prepare the release files

- **Browser game, including LittleJS:** Run the project's build if it has one. Serve the release output and test the controls, sound, and restart. For a multi-file game, ZIP the contents of the output folder so `index.html` is at the top level alongside its assets. Use relative asset paths and match filename case exactly. A self-contained HTML file can be uploaded directly.
- **Downloadable game:** Export a build for each supported OS. Test an extracted copy before uploading. Use one clearly labeled archive per platform, with a short note on how to launch it. Include any credits or licenses your distribution requires.

For example, with clean release files already in `dist/`, use a fresh archive name:

```sh
(cd dist && zip -r ../game-itch-v1.zip .)
unzip -l game-itch-v1.zip
```

On Windows PowerShell:

```powershell
Compress-Archive -Path .\dist\* -DestinationPath .\game-itch-v1.zip
```

Inspect the archive before upload. Keep credentials, private data, and development files out of the release. For HTML limits and host-specific issues, see the [official HTML5 guide](https://itch.io/docs/creators/html5).

## 3. Set up the project page

1. In the [creator dashboard](https://itch.io/dashboard), choose **Create new game**. Start in **Draft**. Set the title and URL slug, add a cover and screenshots, and describe how to play. Choose the appropriate classification, tags, and AI disclosure. See [itch.io's creator guidelines](https://itch.io/docs/creators/quality-guidelines).
2. Choose the game type and upload the release. For a browser game, choose the HTML game type, mark the upload to run in the browser, and set the embed size or fullscreen launch. Turn on mobile support after testing touch controls and layout on a phone. For a downloadable game, select Downloadable, upload the platform builds, and set the platform flags on each file.
3. Confirm the student's pricing choice. For a free classroom release without donations, select **No payments**. If the student wants optional support, use the donation option. See [pricing](https://itch.io/docs/creators/pricing).
4. Save and preview the draft. For a browser game, play a round in the itch.io embed and check the browser console. For a desktop build, verify that the correct platform archive is present and usable. Confirm the title, controls, cover, and credits.

## 4. Publish and verify

1. When the student wants a public release, edit **Visibility & access**, select **Public**, and save. For an approved playtest group, see [Restricted access and download keys](https://itch.io/docs/creators/access-control). An unlisted public page can still be visited by anyone with the link.
2. For a public release, open the project URL in a signed-out window and play the build or download the right archive. Share the verified `https://USERNAME.itch.io/GAME-SLUG` URL with the student. Search indexing is a separate check. See [getting indexed](https://itch.io/docs/creators/getting-indexed).
3. For a manual update, keep the same project page, upload the new build, and verify it before removing an obsolete upload. With Butler, use the existing channel and verify the new version after processing.

## Useful next steps

- **Game jam:** Open the jam page, read its deadline and submission rules, and use the jam's submission form to select the itch.io project. Verify the entry on the jam page. Check whether generative AI is allowed before entering. See [jam requirements](https://itch.io/docs/creators/game-jams#submission-requirements).
- **After launch:** Use the creator dashboard for views and downloads. Use a devlog for a release note and the dashboard's widget controls to embed a link on your own site. See [creator dashboard](https://itch.io/docs/creators/getting-started#the-dashboard) and [widgets](https://itch.io/docs/api/overview).
