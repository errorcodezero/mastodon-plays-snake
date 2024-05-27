import { createRestAPIClient } from "masto";
import { grid, displayGrid, nextGridFrame, foodCoord, snake } from "./game.js";

let game = grid;

// const masto = createRestAPIClient({
//   url: String(process.env.URL),
//   accessToken: String(process.env.TOKEN),
// });

// const status = await masto.v1.statuses.create({
//  status: "",
//  visibility: "private"
// });

// console.log(status.url)

console.log(displayGrid(game));
console.log("")
game = nextGridFrame(game, foodCoord, snake, [1,0])
console.log(displayGrid(game));
console.log("")
game = nextGridFrame(game, foodCoord, snake, [1,0])
console.log(displayGrid(game));
console.log("")
game = nextGridFrame(game, foodCoord, snake, [1,0])
console.log(displayGrid(game));
console.log("")
game = nextGridFrame(game, foodCoord, snake, [1,0])
