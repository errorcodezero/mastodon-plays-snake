import Snake from "./game.js"

const game = new Snake;

console.log(game.getGrid() + "\n")

import { createRestAPIClient } from "masto";

const masto = createRestAPIClient({
  url: process.env.URL,
  accessToken: process.env.TOKEN,
});

const status = await masto.v1.statuses.create({
  status: `${game.getGrid()}`,
  poll: {
    options: [...game.getPossibleMoves()],
    expiresIn: 1800
  }
});
