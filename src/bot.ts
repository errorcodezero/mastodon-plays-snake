import Snake from "./game";
import { createRestAPIClient } from "masto";

const game = new Snake;

const masto = createRestAPIClient({
  url: String(process.env.URL),
  accessToken: process.env.TOKEN,
});

// setInterval(async () => {
//    const user = await masto.v1.accounts.lookup({ acct: "@snake@botsin.space" })
//
//    const status = await masto.v1.statuses.create({
//      status: `${game.getGrid()}`,
//      poll: {
//        options: [...game.getPossibleMoves()],
//        expiresIn: 1800
//      }
//    });
//}, 180000); 

const status = await masto.v1.statuses.create({
  status: `${game.getGrid()}`,
  poll: {
    options: [...game.getPossibleMoves()],
    expiresIn: 1800
  }
});
