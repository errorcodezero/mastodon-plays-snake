import { createRestAPIClient } from "masto";

const masto = createRestAPIClient({
  url: String(process.env.URL),
  accessToken: process.env.TOKEN,
});

await masto.v1.accounts.updateCredentials({ fieldsAttributes: [{ name: "High Score", value: "0" }, { name: "Updates", value: "Every 30 Minutes" }, { name: "ErrorCode0 Website", value: "https://www.errorcodezero.dev" }, { name: "Github", value: "https://github.com/errorcodezero/mastodon-plays-snake" }] });
