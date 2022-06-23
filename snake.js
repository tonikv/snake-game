class Tail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Snake {
    constructor(x, y) {
        this.x = x || 10 * Math.floor((Math.random() * 30));
        this.y = y || 10 * Math.floor((Math.random() * 30));
        this.size = 10;
        this.tail = [];
    }

    move(direction) {
        const [x, y] = direction;
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

export { Snake }