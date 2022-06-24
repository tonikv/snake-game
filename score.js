class Score {
    constructor(pointValue) {
        this.score = 0;
        this.value = pointValue;
    }

    incValue() {
        this.value = this.value + 10;
    }

    getValue() {
        return this.value;
    }

    getScore() {
        return this.score;
    }

    addScore() {
        this.score += this.value;
    }
}

export { Score }