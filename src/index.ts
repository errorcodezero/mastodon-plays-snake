import Snake from "./game.js"

const game = new Snake;

console.log(game.getGrid() + "\n")

game.move("right")

console.log(game.getGrid() + "\n")
