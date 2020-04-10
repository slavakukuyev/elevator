require('dotenv').config();

const ElevatorClass = require("./elevator")
const { turn_off, turn_on, get_pressed } = require('./collections');

const {
    DIRECTION_DOWN,
    DIRECTION_UP,
} = process.env

let Lift1 = new ElevatorClass();

let stdin;

function start() {

    stdin = process.openStdin();

    stdin.addListener("data", function (inputData) {
        let info = inputData.toString().trim();
        console.log("you entered: [" + info + "]");
        if (info) {
            pressed_msg(info)
        }
    });
}

function pressed_msg(info) {
    let inputArr = info.split(',');
    let floor = parseInt(inputArr[0]);

    let direction = inputArr[1];

    if (direction == DIRECTION_UP || direction == DIRECTION_DOWN) {
        turn_on(direction, floor)
        Lift1.move();

    } else Lift1.pressInside(floor);
}

start()

