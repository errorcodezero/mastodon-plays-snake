export type Square = "empty" | "snakeBody" | "snakeHead" | "food"
export type Direction = [0,1] | [1,0] | [0,-1] | [-1, 0]
export type Coord = [number, number];
export const grid: Square[][] = [];
export let snake: Coord[] = [[0,3], [1, 3], [2, 3]]
export let foodCoord: Coord = [3, 2];

for(let i = 0; i<5; i++) {
    grid.push(["empty", "empty", "empty", "empty", "empty"])
}

grid[foodCoord[0]][foodCoord[1]] = "food"

for(let i = 0; i < snake.length; i++) {
    if(i = 0) grid[snake[i][0]][snake[i][1]] = "snakeHead";
    else grid[snake[i][0]][snake[i][1]] = "snakeBody";
}

export function nextGridFrame(grid: Square[][], foodCoord: Coord, snake: Coord[], direction: Direction) {
    const newGrid: Square[][] = [];

    for(let i = 0; i<5; i++) {
        newGrid.push(["empty", "empty", "empty", "empty", "empty"])
    }

    snake.splice(0, 0, [snake[0][0] + direction[0], snake[0][1] + direction[1]])
    snake.pop()

    for (let i = 0; i<snake.length; i++) {
        if(i = 0) newGrid[snake[i][0]][snake[i][1]] = "snakeHead";
        else newGrid[snake[i][0]][snake[i][1]] = "snakeBody";
    }

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
