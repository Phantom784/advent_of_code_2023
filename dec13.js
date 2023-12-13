const input = JSON.parse(require('./dec13_input').vals);

// const input = [
//     "#.##..##.",
//     "..#.##.#.",
//     "##......#",
//     "##......#",
//     "..#.##.#.",
//     "..##..##.",
//     "#.#.##.#.",
//     "",
//     "#...##..#",
//     "#....#..#",
//     "..##..###",
//     "#####.##.",
//     "#####.##.",
//     "..##..###",
//     "#....#..#",
// ];

let patterns = [];
let curPatternIdx = 0;
for (let i = 0; i < input.length; i++) {
    let curPattern = patterns[curPatternIdx];

    if (curPattern == null) {
        patterns[curPatternIdx] = [];
        curPattern = patterns[curPatternIdx];
    }

    let line = input[i];

    if (line != '') {
        curPattern.push(line);
    } else {
        curPatternIdx++
    }
}

console.log(patterns);

let sum = 0;
for(let i = 0; i < patterns.length; i++) {
    sum += getReflections(patterns[i]);
}
console.log(sum);

function getReflections(pattern) {
    let v = getVReflections(pattern);
    console.log(v);

    let h = getHReflections(pattern);
    console.log(h);

    return v + h * 100;
}

function getVReflections(pattern) {
    function colsMatch(a, b) {
        for (let j = 0; j < pattern.length; j++) {
            if (pattern[j][a] !== pattern[j][b]) {
                return false;
            }
        }
        return true;
    }

    function reflect(a, b) {
        if (!colsMatch(a, b)) {
            return false;
        }
        console.log('match cols ' + a + ' ' + b);

        if (a === 0 || b === pattern[0].length - 1) {
            return true;
        }

        return reflect(a - 1, b + 1);
    }

    for (let i = 0; i < pattern[0].length - 1; i++) {
        let res = reflect(i, i + 1);
        if (res) {
            return i + 1;
        }
    }
    return 0;
}

function getHReflections(pattern) {
    function rowsMatch(a, b) {
        if (pattern[a] !== pattern[b]) {
            return false;
        }
        return true;
    }

    function reflect(a, b) {
        if (!rowsMatch(a, b)) {
            return false;
        }
        console.log('match rows ' + a + ' ' + b);

        if (a === 0 || b === pattern.length - 1) {
            return true;
        }

        return reflect(a - 1, b + 1);
    }

    for (let i = 0; i < pattern.length - 1; i++) {
        let res = reflect(i, i + 1);
        if (res) {
            return i + 1;
        }
    }
    return 0;
}