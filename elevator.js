const {
    MOVING_TS = 2000,
    WAITING_TS = 2000,
    HOLD_TS = 1000,// * 60 * 5, // 5 minutes
    MAX_FLOOR = 5,
    MIN_FLOOR = 0,
    DEFAULT_FLOOR = 0,
} = process.env;


//LIFT is moving down.   please check move fnc of direction

class ElevatorClass {
    constructor(props = {}) {
        this.name = props.name || 'LIFT'
        this.waitingTimer = undefined;
        this.holdOnTimer = undefined;
        this.pressedInside = {};
        this.currentFloor = DEFAULT_FLOOR;
        this.opened = false;
        this.direction = 'Up'

        this.buttonsPressed = 0;


        this.next = this.next.bind(this)
        this.moveUp = this.moveUp.bind(this)
        this.moveDown = this.moveDown.bind(this)
        this.pressInside = this.pressInside.bind(this)
        this.move = this.move.bind(this)
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.buildPressedBtns = this.buildPressedBtns.bind(this)

        this.buildPressedBtns();
    }

    buildPressedBtns() {
        for (let i = MIN_FLOOR; i < MAX_FLOOR; i++) {
            this.pressedInside[i] = 0;
        }
    }

    open() {
        if (this.waitingTimer) {
            clearTimeout(this.waitingTimer)
            this.waitingTimer = undefined;
        }

        this.opened = true;
        console.log('LIFT opened on floor ', this.currentFloor)
        this.waitingTimer = setTimeout(this.close, WAITING_TS)
    }

    close() {
        this.opened = false;
        console.log('LIFT closed.')


        this.move()
    }

    isMoveUp() {
        if (this.pressedInside[this.currentFloor]) {
            this.next();
            return;
        }

        if (this.currentFloor == MAX_FLOOR) {
            this.direction = 'Down';
            console.log('direction changed to Down')
            this.move();
            return;
        }

        //check where the first button i pressed 
        for (let i = this.currentFloor + 1; i <= MAX_FLOOR; i++) {
            if (this.pressedInside[i]) {
                this.moveUp();
                return
            }
        }

        if (this.buttonsPressed) {
            this.direction = 'Down'
            this.move();
            return;
        }

        this.holdOn();
    }

    holdOn() {
        if (this.holdOnTimer) clearTimeout(this.holdOnTimer);

        console.log('Nothing pressed. Lift waiting');
        this.holdOnTimer = setTimeout(() => {
            if (this.currentFloor != DEFAULT_FLOOR)
                this.pressInside(DEFAULT_FLOOR)
        }, HOLD_TS)
    }

    move() {
        if (this.movingTimer || this.opened) return;

        if (this.direction == 'Up') {
            this.isMoveUp()
        } else if (this.direction == 'Down') {
            this.isMoveDown();
        }
    }

    pressInside(floor) {
        if (floor > MAX_FLOOR || floor < MIN_FLOOR) {
            console.error('there is no floor: ', floor);
            return;
        }

        console.log('pressed inside: ', floor)
        this.pressedInside[floor] = 1;
        this.buttonsPressed++;
        this.move();
    }

    next() {//on moving

        this.movingTimer = undefined;

        if (this.pressedInside[this.currentFloor]) {
            this.pressedInside[this.currentFloor] = 0;
            this.buttonsPressed--;
            this.open();
            return;
        }


        this.move();

    }

    moveUp() {
        console.log(this.name + ' is moving up...')
        this.movingTimer = setTimeout(() => {
            this.currentFloor++;
            this.next();
        }, MOVING_TS)
    }

    isMoveDown() {
        if (this.pressedInside[this.currentFloor]) {
            this.next();
            return;
        }

        if (this.currentFloor == MIN_FLOOR) {

            this.direction = 'Up';
            console.log('direction changed to Up')
            this.move();
            return;
        }

        for (let i = this.currentFloor - 1; i >= MIN_FLOOR; i--) {
            if (this.pressedInside[i]) {
                this.moveDown();
                return
            }
        }

        if (this.buttonsPressed) {
            this.direction = 'Up'
            this.move();
            return;
        }

        this.holdOn();
    }

    moveDown() {
        console.log(this.name + ' is moving down...')
        this.movingTimer = setTimeout(() => {
            this.currentFloor--;
            this.next();
        }, MOVING_TS)
    }




}

module.exports = ElevatorClass;