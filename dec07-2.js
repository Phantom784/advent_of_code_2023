const input = JSON.parse(require('./dec07_input.js').vals);

// const input = [
//     "32T3K 765",
//     "T55J5 684",
//     "KK677 28",
//     "KTJJT 220",
//     "QQQJA 483",
// ];

const cards = "0J23456789TQKA";
const zero = "0".charCodeAt();

const hands = input.map(hand => {
    hand = hand.split(' ');
    return {
        'hand': hand[0],
        'handVals': hand[0].split('').map(h => String.fromCharCode(cards.indexOf(h) + zero)).join(''),
        'bid': parseInt(hand[1])
    }
});

console.log(hands);

function scoreHand(hand) {
    // hand = hand.split('').sort((a, b) => {
    //     if (a === b) {
    //         return 0;
    //     }

    //     if (cards.indexOf(a) > cards.indexOf(b)) {
    //         return -1;
    //     }

    //     return 1;
    // }
    // );

    let seen = {};

    for (let pos of hand) {
        if (seen[pos] == null) {
            seen[pos] = 1;
        } else {
            seen[pos]++;
        }
    }

    let groups = [];
    for (let s of Object.keys(seen)) {
        if (s === '1') {
            // joker. handle later
            continue;
        }

        if (seen[s] > 1) {
            groups.push(seen[s]);
        }
    }

    let jokers = seen['1'];
    if (jokers === 5 || jokers === 4) {
        // always a 5 of a kind
        groups = [5];
    }
    if (jokers === 3) {
        if (groups.length === 1 && groups[0] === 2) {
            // pair becomes 5 of a kind
            groups = [5];
        }
        else {
            // no pair becomes 4 of a kind
            groups = [4]
        }
    }
    if (jokers === 2) {
        if (groups.length === 1 && groups[0] === 3) {
            // 3 of a kind becomes 5 of a kind
            groups = [5];
        } else if (groups.length === 1 && groups[0] === 2) {
            // pair becomes 4 of a kind
            groups = [4];
        } else {
            // nothing becomes three of a kind
            groups = [3];
        }
    }
    if (jokers === 1) {
        if (groups.length === 1) {
            // if one group, add card to group
            groups[0] += 1;
        } else if (groups.length === 2) {
            // this can't already be a full house
            // so must be 2 pair, which becomes a full house
            groups = [2, 3];
        } else {
            // nothing becomes pair
            groups = [2];
        }
    }

    console.log(seen);
    console.log(groups);
    console.log(groups.length);
    console.log(hand);

    if (groups.length === 1) {
        // five of a kind
        if (groups[0] === 5) {
            return "9" + hand;
        }

        // four of a kind
        if (groups[0] === 4) {
            return "8" + hand;
        }

        // three of a kind
        if (groups[0] === 3) {
            return "6" + hand;
        }

        // one pair
        if (groups[0] === 2) {
            return "4" + hand;
        }
    }

    if (groups.length === 2) {
        console.log('TWO GROUPS!');
        // full house
        if ((groups[0] === 2 && groups[1] === 3) || (groups[0] === 3 && groups[1] === 2)) {
            return "7" + hand;
        }

        // two pair
        if (groups[0] === 2 && groups[1] === 2) {
            return "5" + hand;
        }
    }

    return "0" + hand;
}

for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    // if (hand.hand.indexOf("J") < 0) {
    //     continue;
    // }

    console.log(hand.hand);
    hand.score = scoreHand(hand.handVals);
    console.log(hand.score);
    console.log(' ');
}

hands.sort((a, b) => {
    if (a.score === b.score) {
        return 0;
    }

    if (a.score < b.score) {
        return -1;
    }
    return 1;
});

console.log('RANKED');
console.log(hands);

let score = 0;
for (let i = 0; i < hands.length; i++) {
    score += ((i+1) * hands[i].bid);
}
// > 248484956
// > 249103909
console.log(score);
