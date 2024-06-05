import { createRestAPIClient } from "masto";

const masto = createRestAPIClient({
  url: String(process.env.URL),
  accessToken: process.env.TOKEN,
});

const user = await masto.v1.accounts.lookup({ acct: "@snake@botsin.space" })
const lastStatus = await masto.v1.accounts.$select(user.id).statuses.list();

console.log(lastStatus[0].content);
