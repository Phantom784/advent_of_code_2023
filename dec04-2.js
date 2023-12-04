const input = JSON.parse(require('./dec04_input').vals);

// const input = ["Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
// "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
// "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
// "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
// "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
// "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"];

let sum = 0;
let copies = [];
for (let i = 0; i < input.length; i++) {
    if (copies[i] == null) {
        copies[i] = 1;
    }

    console.log(input[i]);
    console.log('copies: ' + copies[i]);
    let card = input[i].split(':')[1].trim().split('|');
    let mine = card[0].split(' ');
    let winners = card[1].split(' ');

    let score = 0;
    for (let myVal of mine) {
        if (myVal == '') {
            continue;
        }
        for (let winVal of winners) {
            if (winVal == '') {
                continue;
            }
            if (myVal == winVal) {
                score++;
            }
        }
    }

    // distribute copies
    for (let j = 1; j <= score; j++) {
        if (copies[i + j] == null) {
            copies[i + j] = 1;
        }
        copies[i + j] += copies[i];
    }
    
    console.log('card score: ' + score);
    console.log(copies);
    console.log(' ');
    sum += copies[i];
}
console.log(sum);