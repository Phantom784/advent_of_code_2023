const input = JSON.parse(require('./dec14_input').vals);

// const input = [
//     "O....#....",
//     "O.OO#....#",
//     ".....##...",
//     "OO.#O....O",
//     ".O.....O#.",
//     "O.#..O.#.#",
//     "..O..#O..O",
//     ".......O..",
//     "#....###..",
//     "#OO..#....",
// ];

let rocks = [];

for (let i = 0; i < input.length; i++) {
    rocks.push(input[i].split(''));
    console.log(input[i]);
}
console.log('');

const cycles = 1000000000;

function rollCycle(){
    rollNorth();
    rollWest();
    rollSouth();
    rollEast();
}

function rollNorth() {
    for (let i = 0; i < rocks[0].length; i++) {
        rollColNorth(i);
    }
}

function rollSouth() {
    for (let i = 0; i < rocks[0].length; i++) {
        rollColSouth(i);
    }
}

function rollEast(){
    for (let i = 0; i < rocks.length; i++) {
        rollRowEast(i);
    }
}

function rollWest(){
    for (let i = 0; i < rocks.length; i++) {
        rollRowWest(i);
    }
}

function rollColNorth(col) {
    for (let i = 0; i < rocks.length - 1; i++) {
        let cur = rocks[i][col];

        if (cur === '.') {
            for (let j = i + 1; j < rocks.length; j++) {
                let compare = rocks[j][col];

                if (compare === '#') {
                    break;
                }

                if (compare === 'O') {
                    rocks[i][col] = 'O';
                    rocks[j][col] = '.';
                    break;
                }
            }
        }
    }
}

function rollColSouth(col) {
    for (let i = rocks.length - 1; i > 0; i--) {
        let cur = rocks[i][col];

        if (cur === '.') {
            for (let j = i - 1; j >= 0; j--) {
                let compare = rocks[j][col];

                if (compare === '#') {
                    break;
                }

                if (compare === 'O') {
                    rocks[i][col] = 'O';
                    rocks[j][col] = '.';
                    break;
                }
            }
        }
    }
}

function rollRowWest(row) {
    for (let i = 0; i < rocks[0].length - 1; i++) {
        let cur = rocks[row][i];

        if (cur === '.') {
            for (let j = i + 1; j < rocks[0].length; j++) {
                let compare = rocks[row][j];

                if (compare === '#') {
                    break;
                }

                if (compare === 'O') {
                    rocks[row][i] = 'O';
                    rocks[row][j] = '.';
                    break;
                }
            }
        }
    }
}

function rollRowEast(row) {
    for (let i = rocks[0].length - 1; i > 0; i--) {
        let cur = rocks[row][i];

        if (cur === '.') {
            for (let j = i - 1; j >= 0; j--) {
                let compare = rocks[row][j];

                if (compare === '#') {
                    break;
                }

                if (compare === 'O') {
                    rocks[row][i] = 'O';
                    rocks[row][j] = '.';
                    break;
                }
            }
        }
    }
}

let seen = {};
let weights = [];
let loopFound = false;

let loopStart = 0;
let loopEnd = 0;

for (let i = 0; i < cycles; i++) {
    rollCycle();

    if (!loopFound) {
        let key = rocks.map(r => r.join('')).join('');
        if (seen[key]) {
            console.log('LOOPS!');
            loopStart = seen[key];
            loopEnd = i - 1;
            console.log('start: ' + loopStart);
            console.log('end: ' + loopEnd);
            loopFound = true;
            break; // comment out this line to let the brute force run
        } else {
            weights[i] = getWeight();
        }
        seen[key] = i;
    }
}
weights.forEach((w, i) => console.log(i + ': ' + w));

rocks.forEach(r => console.log(r.join('')));
console.log('');

function getWeight() {
    let sum = 0;
    for (let i = 0; i < rocks.length; i++) {
        let score = rocks.length - i;
        let rockCount = rocks[i].filter(r => r === 'O').length
        sum += score * rockCount;
    }
    return sum;
}
// console.log('end weight - brute');
// console.log(getWeight());
// console.log(' ')

console.log('end weight - calc');
let answer = weights[((cycles - 1) - loopStart) % (loopEnd - loopStart + 1) + loopStart];
console.log(answer);