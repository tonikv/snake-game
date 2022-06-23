class Highscores {
    constructor(highscores) {
        this.highscores = highscores;
    }

    setHighscores(highscores) {
        this.highscores = highscores;
    }

    addToHighscores(scoreObj) {
        this.highscores.push(scoreObj);
    }

    getHighscores() {
        return this.highscores;
    }

    getLastScore() {
        return this.highscores[this._highscores.length - 1].score;
    }

    getSize() {
        return this.highscores.length;
    }
}

export { Highscores }