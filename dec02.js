const input = JSON.parse(require('./dec02_input').vals);

const maxCube = {
    "red": 12,
    "green": 13,
    "blue": 14,
}
const total = 12+13+14;

let sum = 0;
for (let i = 0; i < input.length; i++) {
    let game = input[i];

    let pass = true;

    let sets = game.split(':')[1].split(';');
    
    for (let set of sets) {
        let cubes = set.split(',');
        for (let cube of cubes) {
            cube = cube.trim().split(' ');
            console.log(cube);
            if (maxCube[cube[1]] < cube[0]) {
                pass = false;
            }
        }
    }

    if (pass) {
        sum += i + 1;
    }
}

console.log(sum); // 2237