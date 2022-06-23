import { Game } from "./game.js";

// Get button elements
const upArrow = document.querySelector("#up");
const rightArrow = document.querySelector("#right");
const leftArrow = document.querySelector("#left");
const downArrow = document.querySelector("#down");

// Canvas
const canvas = document.querySelector("#gameCanvas");
canvas.width = 350;
canvas.height = 350;

// Ui elements for highscore list, score, restart button and form 
const scoresShowElement = document.querySelector("#scores");
const showMessagesElement = document.querySelector("#messages");
const recordScoreFormElement = document.querySelector("#formScore");
const highscoreItems = document.querySelector("#scoreList");
const btnRestart = document.querySelector("#restartButton");
const touchElement = document.querySelector("#touch");

// Hide elements that are not required in start
recordScoreFormElement.style.display = "none";
scoresShowElement.style.display = "none";
showMessagesElement.style.display = "none";


// Event listeners
btnRestart.addEventListener('click', gameRestart);
recordScoreFormElement.addEventListener('submit', recordScore);
touchElement.addEventListener('touchstart', handleTouchStart, { passive: true});

function handleTouchStart(e) {
    const direction = e.path[0].dataset.direction;
    switch (direction) {
        case "up": {
            SnakeGame.controller.setDirection([0, -speed]);
            break;
        }
        case "down": {
            SnakeGame.controller.setDirection([0, speed]);
            break;
        }
        case "right": {
            SnakeGame.controller.setDirection([speed, 0]);
            break;
        }
        case "left": {
            SnakeGame.controller.setDirection([-speed, 0]);
            break;
        }
            
    }

}

const speed = 10;
const animationSpeed = 10;

const getURI = "http://localhost:3000/api/all";
const storeURI = "http://localhost:3000/api/store";
const deleteURI = "http://localhost:3000/api/delete";

const scoresData = {
    local: [],
    online: [],
    isOnline: false
}

const getScoresData = async () => {
    const response = await fetch(getURI);

    if (response.ok) {
        const data = await response.json();
        scoresData.online.push(...data); 
        scoresData.isOnline = true;
    } else {
        //Todo
        //Load data from localstorage
        scoresData.local.push(scoresLocal);
        scoresData.isOnline = false;
    }
}

const deleteScoreData = async () => {
    const response = await fetch(deleteURI, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        console.table(data);
    } else {
        console.log("error on delete");
    }

}

const postScoreData = async (recordObj) => {
    const response = await fetch(storeURI, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(recordObj) 
    });
    
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        alert("Problem with database - score is not recorded!")
    }
}

function setMessage(message, timeout) {
    showMessagesElement.style.display = "block";
    showMessagesElement.innerText = message;
    setTimeout(() => {
        showMessagesElement.innerText = "";
        showMessagesElement.style.display = "none";
    }, timeout);
}

function removeLowestScore() {
    let smallest = Infinity;
    let index = 0;

    for (let i = 0; i < scoresData.online.length; i++) {
        if (scoresData.online[i].score < smallest) {
            smallest = scoresData.online[i].score;
            index = i;
        }
    }

    scoresData.online.splice(index, 1);
}

async function recordScore(e) {
    e.preventDefault();

    const recordObj = {
        name: e.target.name.value,
        score: SnakeGame.score.getScore()
    }

    const storedScore = await postScoreData(recordObj);
    const data = storedScore;
    scoresData.online.push(data);
    
    if (scoresData.online.length > 10) {
        removeLowestScore()
        const deleteOne = deleteScoreData();
        const deleteScore = await deleteOne;
        console.log(deleteScore);
    }

    clearHighscores();
    generateHighscores(scoresData.online);

    recordScoreFormElement.style.display = "none"
}

const SnakeGame = new Game(speed, canvas);
SnakeGame.controller.keyboardController();
let fps, fpsInterval, startTime, now, then, elapsed;

startGame(animationSpeed);

function startGame(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    getScoresData();
    gameLoop();
}

function gameRestart() {
    scoresShowElement.style.display = "none";
    recordScoreFormElement.style.display = "none";
    SnakeGame.reset(); 
    clearHighscores();
    gameLoop();
}

function gameLoop(newtime) {
    if (SnakeGame.running) {
        requestAnimationFrame(gameLoop);
        now = newtime;
        elapsed = now - then;

        if (SnakeGame.isAlive === false) {
            SnakeGame.running = false;
            gameEndCheck();
        }

        if (elapsed > fpsInterval) {
                then = now - (elapsed % fpsInterval);
                SnakeGame.move();
                SnakeGame.update();
                SnakeGame.render();
        }        
    }
}

// Game over - Show highscore list and possibly record score.
function gameEndCheck() {
    // Check that online scores are available.
    if (!scoresData.isOnline) {
        setMessage("Server is offline! Can't record score.", 1500);
        scoresShowElement.style.display = "block";
        return;
    }
    generateHighscores(scoresData.online);

    // Record score always if there is under 10 scores on list.
    if (scoresData.online.length < 10) {
        setMessage("You made it to TOP TEN!", 1000);
        scoresShowElement.style.display = "block";
        recordScoreFormElement.style.display = "block";
    }
    // If top ten list is populated - Check score and record if larger than smallest entry.
    if (scoresData.online.length >= 10) {
        const scoreToBeat = scoresData.online[scoresData.online.length - 1].score;
        if (SnakeGame.score.getScore() > scoreToBeat) {
            setMessage("You made it to TOP TEN!", 1000);
            scoresShowElement.style.display = "block";
            recordScoreFormElement.style.display = "block";
        } 
    }

    // Did not get highscore. Only show highscore list.
    scoresShowElement.style.display = "block";
}

function generateHighscores(scores) {
    if (!scores) {
        return;
    }

    const sorted = scores.sort((a, b) => b.score - a.score);

    sorted.forEach((scoreItem, index) => {
        let zeroElement = "0"
        if (index >= 9) {
            zeroElement = ""
        }
        const li = document.createElement('li');
        li.classList.add("scoreItem");
        li.innerText = `${zeroElement}${index + 1}. ${scoreItem.name} : ${scoreItem.score}`
        highscoreItems.appendChild(li);
    });
}

function clearHighscores() {
    while( highscoreItems.firstChild ){
        highscoreItems.removeChild( highscoreItems.firstChild );
    }
}