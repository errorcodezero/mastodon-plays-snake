export type Square = "empty" | "snakeBody" | "snakeHead" | "food"
export type Direction = "up" | "down" | "left" | "right"
export type Coord = [number, number];

export default class Snake {
  private readonly x: number = 5;
  private readonly y: number = 5;
  private grid: Square[][] = [];
  private snake: Coord[] = [];
  private food: Coord = [0, 0];
  public currentDirection: Direction | undefined;

  constructor() {
    this.reset()
  }

  public reset() {
    // Makes the entire grid empty
    this.grid = []
    for (let i = 0; i < this.x; i++) this.grid.push(Array(this.y).fill("empty", 0));
    
    // Place snake
    this.snake = [[this.getRndWholeNumber(this.x - 1), this.getRndWholeNumber(this.y - 1)]]
    this.grid[this.snake[0][1]][this.snake[0][0]] = "snakeHead"

    // Place food
    this.placeFood();

    // Reset current direction
    this.currentDirection = undefined;
  }

  private placeFood() {
    let flag = true;
    while (flag) {
        this.food = [this.getRndWholeNumber(this.y), this.getRndWholeNumber(this.x)]
        if (!this.snake.includes(this.food)) flag = false;
        else if(this.snake.length === (this.x * this.y)) {
            this.reset();
            flag = false;
        }
        
        this.grid[this.food[1]][this.food[0]] = "food"
    }
  }

  private getRndWholeNumber(max: number) {
    return Math.floor(Math.random() * (max));
  }

  public getGrid() {
    let gridString = ""
    for (let x = 0; x<this.x; x++) {
        for (let y = 0; y<this.y; y++) {
            switch (this.grid[x][y]) {
                case "food":
                    gridString += "🍎"
                    break;
                case "empty":
                    gridString += "🟦"
                    break;
                case "snakeBody":
                    gridString += "🟩"
                    break;
                case "snakeHead":
                    gridString += "🟢"
                    break;
            }
        }
        if (x != (this.x - 1)) gridString += "\n";
    }

    return gridString;
  }

  public move(direction: Direction) {
    let changeX = 0;
    let changeY = 0;
    this.currentDirection = direction;
    // The changeX and changeY are kinda weird for this but this is the only way it works.
    switch(direction) {
      case "up":
        changeY -= 1;
        break;
      case "down":
        changeY += 1;
        break;
      case "left":
        changeX -= 1;
        break;
      case "right":
        changeX += 1;
        break;
    }

    this.snake.unshift([this.snake[0][0] + changeX, this.snake[0][1] + changeY])
    if (this.snake[0][1] === this.y || this.snake[0][0] === this.x || this.snake[0][1] === -1 || this.snake[0][0] === -1) { 
        this.reset();
        return;
    };
    this.grid[this.snake[0][1]][this.snake[0][0]] = "snakeHead"
    for (let i = 1; i < this.snake.length; i++) {
        this.grid[this.snake[i][1]][this.snake[i][0]] = "snakeBody"
    }
    this.grid[this.snake[this.snake.length - 1][1]][this.snake[this.snake.length - 1][0]] = "empty"
    if(this.snake[0][1] === this.food[1] && this.snake[0][0] === this.food[0]) {
        this.placeFood();
    } else {
        this.snake.pop();
    }
  }
  
  public getPossibleMoves() : Direction[] {
    switch (this.currentDirection) {
      case undefined:
          return ["up", "down", "left", "right"]
      case "up":
          return ["left", "right"]
      case "down":
          return ["left", "right"]
      case "left":
          return ["up", "down"]
      case "right":
          return ["up", "down"]
    }
  }
}
