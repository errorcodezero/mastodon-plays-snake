export type Square = "empty" | "snakeBody" | "snakeHead" | "food"
export type Direction = [0,1] | [1,0] | [0,-1] | [-1, 0]
export type Coord = [number, number];
export const grid: Square[][] = [];
export let snake: Coord[] = [[0, 2], [0, 3], [0, 4]]
export let foodCoord: Coord = [3, 2];

for(let i = 0; i<5; i++) {
    grid.push(["empty", "empty", "empty", "empty", "empty"])
}

grid[foodCoord[0]][foodCoord[1]] = "food"
grid[snake[0][0]][snake[0][1]] = "snakeHead";
grid[snake[1][0]][snake[1][1]] = "snakeBody";
grid[snake[2][0]][snake[2][1]] = "snakeBody";

export function nextGridFrame(grid: Square[][], foodCoord: Coord, snake: Coord[], direction: Direction) {
    const newGrid: Square[][] = grid;

    snake.unshift([snake[0][0] + direction[0], snake[0][1] + direction[1]])

    newGrid[snake[0][0]][snake[0][1]] = "snakeHead";
    for(let i = 1; i<snake.length; i++) {
        newGrid[snake[i][0]][snake[i][1]] = "snakeBody";
    }
    newGrid[snake[snake.length - 1][0]][snake[snake.length - 1][1]] = "empty"

    snake.pop();

    return newGrid;
}

export function displayGrid(grid: Square[][]) {
    let gridString = "";
    for(let i = 0; i<grid.length; i++) {
        for(let j = 0; j<grid[i].length; j++) {
            let gridChar = grid[i][j]
            switch (gridChar) {
                case "empty":
                    gridString += "🟦";
                    break;
                case "snakeHead":
                    gridString += "🟢";
                    break;
                case "snakeBody":
                    gridString += "🟩";
                    break;
                case "food":
                    gridString += "🍎";
                    break;
            }
        }
        if (i!=(grid.length-1)) gridString += "\n";
    }

    return gridString;
}
