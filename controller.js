class Controller {
    constructor(speed, touchElement) {
        this.speed = speed;
        this.direction = [0, 0];
    }

    setDirection(direction) {
        this.direction = direction;
    }

    keyboardController() {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            switch (keyName) {
                case ("ArrowLeft"):
                    this.direction = [-this.speed, 0];
                    break;
                case ("ArrowRight"):
                    this.direction = [this.speed, 0];
                    break;
                case ("ArrowUp"):
                    this.direction = [0, -this.speed];
                    break;
                case ("ArrowDown"):
                    this.direction = [0, this.speed];
                    break;
                default:
                    break;
            }
        })
    }

    buttonsController(upArrow, rightArrow, leftArrow, downArrow) {
        upArrow.addEventListener('click', arrowButtonPressed.bind(this));
        rightArrow.addEventListener('click', arrowButtonPressed.bind(this));
        leftArrow.addEventListener('click', arrowButtonPressed.bind(this));
        downArrow.addEventListener('click', arrowButtonPressed.bind(this));

        function arrowButtonPressed(event){
            switch (event.target.id) {
                case ("up"):
                    this.direction = ([0, -this.speed]);
                    upArrow.classList.add("active-arrow");
                    rightArrow.classList.remove("active-arrow");
                    leftArrow.classList.remove("active-arrow");
                    downArrow.classList.remove("active-arrow");
                    break;
                case ("right"):
                    this.direction = ([this.speed, 0]);
                    upArrow.classList.remove("active-arrow");
                    rightArrow.classList.add("active-arrow");
                    leftArrow.classList.remove("active-arrow");
                    downArrow.classList.remove("active-arrow");
                    break;
                case ("left"):
                    this.direction = ([-this.speed, 0]);
                    upArrow.classList.remove("active-arrow");
                    rightArrow.classList.remove("active-arrow");
                    leftArrow.classList.add("active-arrow");
                    downArrow.classList.remove("active-arrow");
                    break;
                case ("down"):
                    this.direction = ([0, this.speed]);
                    upArrow.classList.remove("active-arrow");
                    rightArrow.classList.remove("active-arrow");
                    leftArrow.classList.remove("active-arrow");
                    downArrow.classList.add("active-arrow");
                    break;
            }
        }
    }

    getDirection() {
        return this.direction;
    }

    setDirection(direction) {
        this.direction = direction;
    }
}

export { Controller }