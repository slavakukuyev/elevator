const {
    DIRECTION_UP,
    // DIRECTION_DOWN,
} = process.env;

const MAX_FLOOR = parseInt(process.env.MAX_FLOOR) || 5;
const MIN_FLOOR = parseInt(process.env.MIN_FLOOR) || 0;

let PRESSED_UP = {};
let PRESSED_DOWN = {};

function init_collections() {
    for (let i = MIN_FLOOR; i < MAX_FLOOR; i++) {
        PRESSED_UP[i] = 0;
    }

    for (let i = MIN_FLOOR + 1; i <= MAX_FLOOR; i++) {
        PRESSED_DOWN[i] = 0;
    }
}

function is_pressed(direction, floor) {
    return direction == DIRECTION_UP ? PRESSED_UP[floor] : PRESSED_DOWN[floor];
}

function set(direction, floor, turn = 0) {
    if ((!parseInt(floor) && floor !== 0)
        || floor < MIN_FLOOR
        || floor > MAX_FLOOR) return;

    if (direction == DIRECTION_UP) {
        PRESSED_UP[floor] = turn;
    } else {
        PRESSED_DOWN[floor] = turn;
    }

    console.log('Outside "%s" button turned light %s at floor %d',
        direction, turn ? 'on' : 'off', floor);
}

function turn_on(direction, floor) {
    set(direction, floor, 1);
}

function turn_off(direction, floor) {
    set(direction, floor, 0);
}

init_collections();

module.exports = { turn_on, turn_off, is_pressed }