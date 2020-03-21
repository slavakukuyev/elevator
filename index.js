const ElevatorClass = require("./elevator")

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
    let number = parseInt(inputArr[0]);

    Lift1.pressInside(number);
    return;

    if ((inputArr[1] === 'up'
        || inputArr[1] === 'down')
        && Number.isInteger(number) && !isNaN(number)) {
        Lift1.pressInside(number, inputArr[1])
    }

    else {
        console.log('Invalid direction or floor')
    }
}

start()

