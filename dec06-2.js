const input = JSON.parse(require('./dec06_input').vals);

// const input = [
//      "Time:      7  15   30",
//      "Distance:  9  40  200"
// ];

let time = parseInt(input[0].split(':')[1].trim().replaceAll(/\s+/g, ''));
let dist = parseInt(input[1].split(':')[1].trim().replaceAll(/\s+/g, ''));

console.log(time);
console.log(dist);

let wins = 0;
for (let i = 0; i <= time; i++) {
    let timeLeft = time - i;
    let speed = i;
    let travel = timeLeft * speed;

    //console.log('timeLeft: ' + timeLeft + ' speed: ' + speed + ' travel: ' + travel);

    if (travel > dist) {
        wins++;
    }
}
console.log(wins);