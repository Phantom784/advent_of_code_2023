const input = JSON.parse(require('./dec01_input').vals);

const digits = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
];

function makeTrie(digits) {
    let trie = {};

    for (let i = 1; i <= 9; i++) {
        trie[i] = i;
    }

    for (let i = 0; i < digits.length; i++) {
        let digit = digits[i];

        let cur = trie;
        for (let j = 0; j < digit.length; j++) {
            let char = digit[j];

            if (cur[char] == null) {
                cur[char] = {};
            }

            if (j == digit.length - 1) {
                cur[char] = i + 1;
            } else {
                cur = cur[char];
            }
        };
    }
    return trie;
}

const digitsTrie = makeTrie(digits);
const revDigitsTrie = makeTrie(digits.map(d => d.split('').reverse().join('')));

function matchTrie(code, trie, reverse = false) {
    let curTries = [trie];

    for (let i = (reverse ? code.length - 1 : 0); reverse ? i >= 0 : i < code.length; reverse ? i-- : i++) {
        let char = code[i];
        let nextTries = [trie];
        for (let curTrie of curTries) {
            if (curTrie[char] != null) {
                // check if we found entire digit string
                if (typeof (curTrie[char]) === 'number') {
                    return curTrie[char];
                }
                nextTries.push(curTrie[char]);
            }
        }
        curTries = nextTries;
    }
}

function decode(code) {
    let first = matchTrie(code, digitsTrie);
    let last = matchTrie(code, revDigitsTrie, true);
    return first * 10 + last;
}

let sum = 0;
for (let code of input) {
    sum += parseInt(decode(code));
}
console.log(sum); //53592