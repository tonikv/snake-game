class Tail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.tail = [];
    }

    move(x, y) {
        // Store head position before moving
        let previousX = this.x;
        let previousY = this.y;
        this.x += x;
        this.y += y;

        // Move tail parts
        if (this.tail.length > 0) {
            for (let part of this.tail) {
                let bodyPreviousX = part.x;
                let bodyPreviousY = part.y;
                part.x = previousX;
                part.y = previousY;
                previousX = bodyPreviousX;
                previousY = bodyPreviousY;
            }
        }
    }

    getAllLocations() {
        const locations = [];
        locations.push({ x: this.x, y: this.y });

        // Get tail locations
        if (this.tail.length > 0) {
            for (let part of this.tail) {
                locations.push({ x: part.x, y: part.y });
            }
        }
        return locations;
    }

    grow() {
        this.tail.push(new Tail(this.x, this.y));
    }

    checkBodyCollision() {
        for (let part of this.tail) {
            if (this.x === part.x && this.y === part.y) {
                return true;
            }
        }
        return false;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        for (let part of this.tail) {
            ctx.fillRect(part.x, part.y, this.size, this.size);
        }
        ctx.restore();
    }
}

class Food {
    constructor() {
        this.x = 10 * Math.floor((Math.random() * 40));
        this.y = 10 * Math.floor((Math.random() * 40));
        this.size = 10;
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

class Game {
    constructor(speed, controller, snake, food, canvas, scoreElem) {
        this.score = 0
        this.killed = false;
        this.snake = snake;
        this.food = food;
        this.canvas = canvas;
        this.movement = controller;
        this.speed = speed;
        this.ctx = canvas.getContext('2d');
        this.scoreElem = scoreElem;
        this.isAlive = true;
    }

    endGame() {
        //this.ctx.fillStyle = 'black';
        //this.ctx.fillRect(0, 0, 400, 400);
        console.log("Game ended");
    }

    render() {
        this.ctx.clearRect(0, 0, 400, 400);
        this.snake.draw(this.ctx);
        this.food.draw(this.ctx)
    }

    update() {
        // Check if food is collected
        if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
            this.snake.grow();
            this.score += 10;
            this.food = new Food();
            this.scoreElem.innerText = (`SCORE: ${this.score}`);
            return;
        }

        // Check collision of walls
        if (this.snake.x > this.canvas.width || this.snake.x < 0) {
            this.isAlive = false;
        }

        if (this.snake.y > this.canvas.height || this.snake.y < 0) {
            this.isAlive = false;
        }

        if (this.snake.checkBodyCollision()) {
            this.isAlive = false;
        }
    }

    setMovement(direction) {
        this.movement = direction;
    }

    createEvents() {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            switch (keyName) {
                case ("ArrowLeft"):
                    this.movement = [-this.speed, 0];
                    break;
                case ("ArrowRight"):
                    this.movement = [this.speed, 0];
                    break;
                case ("ArrowUp"):
                    this.movement = [0, -this.speed];
                    break;
                case ("ArrowDown"):
                    this.movement = [0, this.speed];
                    break;
                default:
                    break;
            }
        })
    }

    move() {
        this.snake.move(this.movement[0], this.movement[1]);
    }
}

export { Snake, Food, Game };