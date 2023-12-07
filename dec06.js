//const input = JSON.parse(require('./dec06_input').vals);

const input = [
     "Time:      7  15   30",
     "Distance:  9  40  200"
];

let times = input[0].split(':')[1].trim().split(/\s+/).map(t => parseInt(t));
let dists = input[1].split(':')[1].trim().split(/\s+/).map(t => parseInt(t));

console.log(times);
console.log(dists);

let races = [];

for (let i = 0; i < times.length; i++) {
    races.push([times[i], dists[i]]);
}

console.log(races);

let winProduct = 1;
for (race of races) {
    let time = race[0];
    let dist = race[1];

    let wins = 0;
    for (let i = 0; i <= time; i++) {
        let timeLeft = time - i;
        let speed = i;
        let travel = timeLeft * speed;

        console.log('timeLeft: ' + timeLeft + ' speed: ' + speed + ' travel: ' + travel);

        if (travel > dist) {
            wins++;
        }
    }
    console.log(wins);
    winProduct = winProduct * wins;
}
console.log(winProduct);