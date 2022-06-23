class Score {
    constructor(pointValue) {
        this._score = 0;
        this._value = pointValue;
    }

    getScore() {
        return this._score;
    }

    addScore() {
        this._score += this._value;
    }
}

export { Score }