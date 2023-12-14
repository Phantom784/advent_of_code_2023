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

for (let i = 0; i < rocks[0].length; i++) {
    rollCol(i);
}

function rollCol(col) {
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

rocks.forEach(r => console.log(r.join('')));
console.log('');

let sum = 0;
for (let i = 0; i < rocks.length; i++) {
    let score = rocks.length - i;
    let rockCount = rocks[i].filter(r => r === 'O').length
    sum += score * rockCount;
}
console.log(sum);