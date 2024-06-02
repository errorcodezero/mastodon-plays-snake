import Snake from "./game.js"

const game = new Snake;

console.log(game.getGrid() + "\n")

game.next("up")

console.log(game.getGrid())
