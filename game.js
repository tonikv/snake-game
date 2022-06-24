import { Controller } from "./controller.js";
import { Score } from "./score.js";
import { Snake } from "./snake.js";
import { Food } from "./food.js";
import { Highscores } from "./highscores.js";

class Game {
    constructor(speed, canvas, gameSpeed) {
        this.score = new Score(10);
        this.snake = new Snake();
        this.food = new Food();
        this.gameSpeed = gameSpeed;
        this.controller = new Controller(speed);
        this.highscores = new Highscores();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.font = "20px Retro";
        this.ctx.textAlign = "center";
        this.speed = speed;
        this.makeItHarder = false;
        this.isAlive = true;
        this.running = true;
    }

    setGameSpeed(multiplyer) {
        this.gameSpeed = this.gameSpeed * multiplyer;
        return this.gameSpeed;
    }

    getGameSpeed() {
        return this.gameSpeed;
    }

    reset() {
        this.score = new Score(10);
        this.snake = new Snake();
        this.food = new Food();
        this.makeItHarder = false;
        this.gameSpeed = 10;
        this.isAlive = true;
        this.running = true;
        this.controller.setDirection([0, 0]);
    }


    endGame() {
        //this.ctx.fillStyle = 'black';
        //this.ctx.fillRect(0, 0, 400, 400);
        console.log("Game ended");
    }

    render() {
        this.ctx.clearRect(0, 0, 400, 400);
        this.snake.draw(this.ctx);
        this.food.draw(this.ctx);

        // Score
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(`${this.score.getScore()}`, 30, 30);
    }

    update() {
        // Check if food is collected
        if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
            this.snake.grow();
            this.score.addScore();
            this.makeItHarder = true;
            this.food = new Food();
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

    move() {
        this.snake.move(this.controller.getDirection());
    }
}

export { Game };