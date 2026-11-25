# Configure Cloudflare DNS or deploy a Worker

## Goal

Connect a custom domain to an existing site, or deploy server-side code to Cloudflare Workers. Identify the current host, the exact hostname, and who controls the Cloudflare zone or Worker account before changing settings.

## Custom domain for GitHub Pages

1. Verify the existing Pages deployment and domain ownership. Set the intended hostname in the repository's Pages settings.
2. Add the records GitHub specifies in the Cloudflare DNS zone. For a subdomain, use a DNS-only CNAME pointing to `OWNER.github.io`, with no repository path. For a bare domain, follow GitHub's apex instructions. Check existing records on the hostname and preserve unrelated records, including mail records.
3. Confirm public DNS resolution, the Pages domain check, and HTTPS. Open the intended hostname and verify the homepage and critical assets.

Follow [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). This route keeps GitHub Pages as the host.

## Deploy a Worker for an API or relay

1. Check `wrangler.toml`, `wrangler.json` or `wrangler.jsonc`, the package scripts, and CI. Use the existing workflow and package version. For a new Worker, follow the [official Wrangler quickstart](https://developers.cloudflare.com/workers/get-started/guide/).
2. Run the project's tests and test the changed endpoint locally with the project's dev command or `wrangler dev`. Identify the intended account, Worker, environment, and any required bindings or migrations. Store credentials as [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/) and keep local secret files out of Git.
3. Use the existing deployment workflow. For CLI-managed projects, verify the account with `wrangler whoami` and use `wrangler deploy` with the project's intended environment. For a direct Worker hostname in the project's Cloudflare zone, use [Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
4. Check the deployed version and exercise the public endpoint. For an API, verify its expected response and one failure case. For a relay, reproduce the actual two-client behavior.

## Worked example: Mini Flow relay

[KakkoiDev/p2p-core-cloudflare](https://github.com/KakkoiDev/p2p-core-cloudflare) deploys the WebSocket relay from the adjacent `p2p-core` checkout. Follow that repository for its exact Node/Wrangler commands and run the relay protocol tests before deployment. Its Wrangler config declares the `ROOMS` Durable Object binding and migration. Set `ALLOWED_ORIGINS` to the exact HTTPS origins of the apps using the relay. Point the client at the deployed `wss://` endpoint and verify an edit travels in both directions between a host and a Safari guest. Use a relay operator you trust, since it can read forwarded messages.
