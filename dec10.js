const input = JSON.parse(require('./dec10_input.js').vals);

// const input = [
//     "..F7.",
//     ".FJ|.",
//     "SJ.L7",
//     "|F--J",
//     "LJ...",
// ];

let start = findS();
console.log(start);

// find "S"
function findS()
{
    for (let i = 0; i < input.length; i++) {
        let line = input[i];
        for (let j = 0; j < line.length; j++) {
            if (input[i][j] === "S") {
                return [i, j];
            }
        }
    }
}

let coords = start;
let count = 0;
let fromDir = null;
let cur = input[coords[0]][coords[1]];

while (true) {
    console.log('searching : ' + coords);
    cur = input[coords[0]][coords[1]];

    if (cur == "S" && count > 0) {
        break;
    }

    let north = input[coords[0] - 1] == null ? null : input[coords[0] - 1][coords[1]];
    let south = input[coords[0] + 1] == null ? null : input[coords[0] + 1][coords[1]];
    let east = input[coords[0]][coords[1] + 1];
    let west = input[coords[0]][coords[1] - 1];

    console.log('N: ' + north + ' S: ' + south + ' E: ' + east + ' W: ' + west);

    switch (cur)
    {
        case "|":
            east = null;
            west = null;
            break;
        case "-":
            north = null;
            south = null;
            break;
        case "F":
            north = null;
            west = null;
            break;
        case "7":
            north = null;
            east = null;
            break;
        case "L":
            south = null;
            west = null;
            break;
        case "J":
            south = null;
            east = null;
            break;
    }

    console.log('N: ' + north + ' S: ' + south + ' E: ' + east + ' W: ' + west);

    switch (fromDir) {
        case 'north':
            north = null;
            break;
        case 'south':
            south = null;
            break;
        case 'east':
            east = null;
            break;
        case 'west':
            west = null;
            break;
    }

    console.log('N: ' + north + ' S: ' + south + ' E: ' + east + ' W: ' + west);

    if (north === "F" || north === "7" || north === "|" || north === "S") {
        console.log('north');
        coords = [coords[0] - 1, coords[1]];
        count += 1;
        fromDir = 'south';
        continue;
    }

    if (south === "L" || south === "J" || south === "|" || south === "S") {
        console.log('south');
        coords = [coords[0] + 1, coords[1]];
        count += 1;
        fromDir = 'north';
        continue;
    }

    if (west === "F" || west === "L" || west === "-" || west === "S") {
        console.log('west');
        coords = [coords[0], coords[1] - 1];
        count += 1;
        fromDir = 'east';
        continue;
    }

    if (east === "7" || east === "J" || east === "-" || east === "S") {
        console.log('east');
        coords = [coords[0], coords[1] + 1];
        count += 1;
        fromDir = 'west';
        continue;
    }
}

console.log("TOTAL COUNT: " + count);
console.log("ANSWER: " + (count/2));
return;