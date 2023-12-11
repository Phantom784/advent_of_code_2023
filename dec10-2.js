const input = JSON.parse(require('./dec10_input.js').vals);

// const input = [
//     "...........",
//     ".S-------7.",
//     ".|F-----7|.",
//     ".||.....||.",
//     ".||.....||.",
//     ".|L-7F--J|.",
//     ".|..||...|.",
//     ".L--JL---J.",
//     "...........",
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

let clean = [];
const lineLen = input[0].length;
for (let i = 0; i < input.length; i++) {
    clean.push('.'.repeat(lineLen * 3).split(''));
    clean.push('.'.repeat(lineLen * 3).split(''));
    clean.push('.'.repeat(lineLen * 3).split(''));
}

let sDirs = [];

let sprites = {
    '|': [
        '`|`',
        '`|`',
        '`|`',
    ],
    '-': [
        '```',
        '---',
        '```',
    ],
    'L': [
        '`L`',
        '`LL',
        '```',
    ],
    'J': [
        '`J`',
        'JJ`',
        '```',
    ],
    '7': [
        '```',
        '77`',
        '`7`',
    ],
    'F': [
        '```',
        '`FF',
        '`F`',
    ],
    'S': [
        'SSS',
        'SSS',
        'SSS'
    ]

}

function drawClean(c, val) {
    let sprite = sprites[val];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            clean[c[0] * 3 + i][c[1] * 3 + j] = sprite[i][j];
        }
    }
}

while (true) {
    console.log('searching : ' + coords);
    cur = input[coords[0]][coords[1]];

    console.log(cur);
    drawClean(coords, cur);

    if (cur == "S" && count > 0) {
        sDirs.push(fromDir);
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

        if (sDirs.length === 0) {
            sDirs.push('north');
        }
        continue;
    }

    if (south === "L" || south === "J" || south === "|" || south === "S") {
        console.log('south');
        coords = [coords[0] + 1, coords[1]];
        count += 1;
        fromDir = 'north';

        if (sDirs.length === 0) {
            sDirs.push('south');
        }
        continue;
    }

    if (west === "F" || west === "L" || west === "-" || west === "S") {
        console.log('west');
        coords = [coords[0], coords[1] - 1];
        count += 1;
        fromDir = 'east';

        if (sDirs.length === 0) {
            sDirs.push('west');
        }
        continue;
    }

    if (east === "7" || east === "J" || east === "-" || east === "S") {
        console.log('east');
        coords = [coords[0], coords[1] + 1];
        count += 1;
        fromDir = 'west';

        if (sDirs.length === 0) {
            sDirs.push('east');
        }
        continue;
    }
}

console.log("TOTAL COUNT: " + count);
console.log("ANSWER: " + (count/2)); // 6806
console.log(sDirs);

// replace "S" with correct character
sDirs = sDirs.sort().join('');
let newS = ''
switch (sDirs) {
    case 'northsouth':
        newS = '|';
        break;
    case 'eastwest':
        newS = '-';
        break;
    case 'eastnorth':
        newS = 'L';
        break;
    case 'northwest':
        newS = 'J';
        break;
    case 'southwest':
        newS = '7';
        break;
    case 'eastsouth':
        newS = 'F';
        break;
}

drawClean(start, newS);

//clean.forEach(l => console.log(l.join('')));

let stack = [[0, 0]];
const val = ' ';
while (stack.length > 0) {
    let coords = stack.pop();
    
    let north = clean[coords[0] - 1] == null ? null : clean[coords[0] - 1][coords[1]];
    let south = clean[coords[0] + 1] == null ? null : clean[coords[0] + 1][coords[1]];
    let east = clean[coords[0]][coords[1] + 1];
    let west = clean[coords[0]][coords[1] - 1];

    if (north === '.' || north === '`') {
        clean[coords[0] - 1][coords[1]] = val;
        stack.push([coords[0] - 1, coords[1]]);
    }

    if (south === '.' || south === '`') {
        clean[coords[0] + 1][coords[1]] = val;
        stack.push([coords[0] + 1, coords[1]]);
    }

    if (east === '.' || east === '`') {
        clean[coords[0]][coords[1] + 1] = val;
        stack.push([coords[0], coords[1] + 1]);
    }

    if (west === '.' || west === '`') {
        clean[coords[0]][coords[1] - 1] = val;
        stack.push([coords[0], coords[1] - 1]);
    }
}

clean.forEach(l => console.log(l.join('')));

// counts .s, divide by 9
let dots = 0;
for (let i = 0; i < clean.length; i++) {
    for (let j = 0; j < clean.length; j++) {
        if (clean[i][j] === '.') {
            dots++;
        }
    }
}
console.log(dots/9);