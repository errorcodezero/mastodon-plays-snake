import { createRestAPIClient } from "masto";
import { grid, displayGrid, nextGridFrame, foodCoord, snake } from "./game.js";

const masto = createRestAPIClient({
  url: String(process.env.URL),
  accessToken: String(process.env.TOKEN),
});

// const status = await masto.v1.statuses.create({
//  status: "",
//  visibility: "private"
// });

// console.log(status.url)

console.log(displayGrid(grid));
console.log("")
console.log(displayGrid(nextGridFrame(grid, foodCoord, snake, [0,1])));
