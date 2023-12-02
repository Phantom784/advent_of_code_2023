const input = JSON.parse(require('./dec02_input').vals);

const maxCube = {
    "red": 12,
    "green": 13,
    "blue": 14,
}

let sum = 0;
for (let i = 0; i < input.length; i++) {
    let game = input[i];
    console.log(game);

    let min = {
        "red": 0,
        "green": 0,
        "blue": 0,
    };

    let sets = game.split(':')[1].split(';');
    
    for (let set of sets) {
        let cubes = set.split(',');
        for (let cube of cubes) {
            cube = cube.trim().split(' ');
            console.log(cube);
            if (min[cube[1]] < parseInt(cube[0])) {
                min[cube[1]] = parseInt(cube[0]);
            }
        }
    }
    console.log(min);

    let power = min["red"] * min["green"] * min["blue"]

    sum += power;
}

console.log(sum); // 66681