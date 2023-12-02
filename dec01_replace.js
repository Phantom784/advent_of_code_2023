const input = JSON.parse(require('./dec01_input').vals);

const digitReplacements = [
    ["oneight", "18"],
    ["twone", "21"],
    ["threeight", "38"],
    ["fiveight", "58"],
    ["nineight", "98"],
    ["eightwo", "82"],
    ["eighthree", "83"],
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"],
];

const zero = "0".charCodeAt();

let sum = 0;
for (let line of input) {

    for (var digit of digitReplacements) {
        line = line.replaceAll(digit[0], digit[1]);
    }

    let first, last;

    for (let i = 0; i < line.length; i++) {
        let charCode = line[i].charCodeAt();
        if (charCode >= zero && charCode <= zero + 9) {
            first = parseInt(line[i]);
            break;
        }
    }

    for (let i = line.length - 1; i >=0; i--) {
        let charCode = line[i].charCodeAt();
        if (charCode >= zero && charCode <= zero + 9) {
            last = parseInt(line[i]);
            break;
        }
    }

    sum += (first * 10 + last);
}

console.log(sum); //53592