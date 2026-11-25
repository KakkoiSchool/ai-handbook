# Add email to a project

## Goal

Choose a delivery path and verify it with a local preview and one authorized test message.

| Request | Route |
|---|---|
| Send confirmations, alerts, or a personal digest | Use the project's existing transactional provider over its server-side API, Worker binding, or SMTP. |
| Forward or process messages sent to an address on your domain | Use [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/) or the existing mail provider. Check existing MX records before changing an active mailbox configuration. |
| Send a newsletter to subscribers | Use a mailing-list provider with opt-in, unsubscribe, and bounce handling. |

## Classroom exercise: mainichi-news

1. Follow the quickstart in [KakkoiSchool/mainichi-news](https://github.com/KakkoiSchool/mainichi-news). Run `uv run mainichi-news preview` to render the digest without sending mail, writing delivery state, or archiving. With no model key configured, it can preview the headlines.
2. For a local SMTP test, run [Mailpit](https://mailpit.axllent.org/docs/) on your own machine. The example below binds both listeners to loopback and enables authentication with dummy credentials, which the current mainichi-news SMTP client expects. Start Mailpit with relay and forwarding disabled.

   ```sh
   mailpit --smtp 127.0.0.1:1025 --listen 127.0.0.1:8025 \
     --smtp-auth-accept-any --smtp-auth-allow-insecure
   ```

3. Use a separate config and environment file for the test. In the config, set `digest_dir` to a scratch directory and set `enabled = false` under the `[archive]` header. Leave `[deliver].to` and `[deliver].from` unset so the environment file below supplies both. Use a fresh terminal with no production SMTP variables, which would override that file.

   ```dotenv
   SMTP_HOST=127.0.0.1
   SMTP_PORT=1025
   SMTP_STARTTLS=false
   SMTP_USER=local-test
   SMTP_PASSWORD=local-test
   SMTP_FROM=sender@example.test
   MAINICHI_NEWS_TO=recipient@example.test
   ```

   Run `uv run mainichi-news --config PATH_TO_TEST_TOML --env PATH_TO_TEST_ENV status` and confirm the fake recipient and loopback server. Run the same command with `run` in place of `status`, setting `MAINICHI_NEWS_STATE` to a separate test-only file in your environment. Open <http://127.0.0.1:8025> and inspect the subject and both text and HTML versions. Run it again with the same test state and verify it skips the second delivery.
4. For live delivery, use the real provider's current setup instructions. Keep the credential in a server-side secret store, verify the sender or domain, and add the exact DNS records the provider supplies. Check alignment using the received message headers. Confirm the recipient is your own authorized inbox, send one test, and compare the provider's delivery log with what actually arrived. Check spam and bounces when the results disagree.

For a Worker project, [Cloudflare Email Sending](https://developers.cloudflare.com/email-service/get-started/send-emails/) is a transactional option. Workers Free can send to verified destination addresses. Sending to other recipients requires Workers Paid. Check the [current plan limits](https://developers.cloudflare.com/email-service/platform/pricing/) before selecting it.

## Retry and verify

Use a stable ID for each planned message and retain delivery state. If a send times out after submission, check the provider's status or use its idempotency mechanism before retrying. Test the rendered message, the successful send, and a provider failure using fake data before wiring up a scheduler.
