import { Snake, Food, Game } from "./gameClasses.js"

// Get button elements
const upArrow = document.querySelector("#up");
const rightArrow = document.querySelector("#right");
const leftArrow = document.querySelector("#left");
const downArrow = document.querySelector("#down");
const restartButton = document.querySelector("#restart");

// Add eventlisteners

// Restart
restartButton.addEventListener('click', () => {
    initialConditions();
})

// Arrows for movement
upArrow.addEventListener('click', arrowButtonPressed);
rightArrow.addEventListener('click', arrowButtonPressed);
leftArrow.addEventListener('click', arrowButtonPressed);
downArrow.addEventListener('click', arrowButtonPressed);

let controller = [0,0];

function arrowButtonPressed(event) {
    switch (event.target.id) {
        case ("up"):
            controller = [0, -10];
            upArrow.classList.add("active-arrow");
            rightArrow.classList.remove("active-arrow");
            leftArrow.classList.remove("active-arrow");
            downArrow.classList.remove("active-arrow");
            break;
        case ("right"):
            controller = [10, 0];
            upArrow.classList.remove("active-arrow");
            rightArrow.classList.add("active-arrow");
            leftArrow.classList.remove("active-arrow");
            downArrow.classList.remove("active-arrow");
            break;
        case ("left"):
            controller = [-10, 0];
            upArrow.classList.remove("active-arrow");
            rightArrow.classList.remove("active-arrow");
            leftArrow.classList.add("active-arrow");
            downArrow.classList.remove("active-arrow");
            break;
        case ("down"):
            controller = [0, 10];
            upArrow.classList.remove("active-arrow");
            rightArrow.classList.remove("active-arrow");
            leftArrow.classList.remove("active-arrow");
            downArrow.classList.add("active-arrow");
            break;
    }
    SnakeGame.setMovement(controller);
}




// Get display elements
const endGameElem = document.querySelector("#menu");
const menuElem = document.querySelector(".menuContainer");
const scoreElem = document.querySelector("#scoreDisplay");
const highscoreElem = document.querySelector("#scoreHigh");


const canvas = document.querySelector("#canvas");
canvas.width = 400;
canvas.height = 400;

const speed = 10;
const animationSpeed = 15;
let SnakeGame;
let fps, fpsInterval, startTime, now, then, elapsed;

function initialConditions() {
    SnakeGame = new Game(speed, controller, new Snake(100, 100), new Food(), canvas, scoreElem);
    SnakeGame.createEvents();
    scoreElem.innerText = (`SCORE: ${SnakeGame.score}`);
    menuElem.classList.remove ("animate");
    startGame(animationSpeed);
}


function startGame(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    gameLoop();
}

function gameLoop(newtime) {
    if (SnakeGame.isAlive) {
        requestAnimationFrame(gameLoop);

        now = newtime;
        elapsed = now - then;

        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            SnakeGame.move(controller);
            SnakeGame.update();
            SnakeGame.render();

        }
    } else {
        highscoreElem.innerText = (`You'r score was: ${SnakeGame.score}!`);
        menuElem.classList.add ("animate");
        SnakeGame.endGame();
    }
}

initialConditions();