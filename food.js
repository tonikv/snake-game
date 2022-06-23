class Food {
    constructor() {
        this.x = 10 * Math.floor((Math.random() * 30));
        this.y = 10 * Math.floor((Math.random() * 30));
        this.size = 10;
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

export { Food }