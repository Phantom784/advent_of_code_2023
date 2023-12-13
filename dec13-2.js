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

// console.log(patterns);

let sum = 0;
for(let i = 0; i < patterns.length; i++) {
    sum += getReflections(patterns[i]);
}
console.log(sum);

function getReflections(pattern) {
    pattern.forEach(p => console.log(p));

    let origReflection = getVHReflections(pattern);
    console.log(origReflection);
    let smudgeReflection = getSmudgeReflections(pattern, origReflection);
    console.log(smudgeReflection);

    console.log(' ');
    return smudgeReflection[0] + smudgeReflection[1] * 100;
}

function getVHReflections(pattern, skip) {


    let v = getVReflections(pattern, skip ? skip[0]: null);
    console.log(v);

    let h = getHReflections(pattern, skip ? skip[1] : null);
    console.log(h);
    return [v, h];
}

function getSmudgeReflections(pattern, origReflection) {
    let smudgeList = [];
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0 ; j < pattern[0].length; j++) {
            let smudgePattern = getSmudgePattern(pattern, i, j);
            // console.log(' ');
            // smudgePattern.forEach(s => console.log(s));
            // console.log(' ');
            let smudgeReflection = getVHReflections(smudgePattern, origReflection);
            // console.log(smudgeReflection);

            if (!smudgeReflection.every(s => s === 0)) {
                console.log(smudgeReflection);
                smudgeList.push(smudgeReflection);
                return smudgeReflection;
            }
        }
    }
    console.log(smudgeList);
}

function getSmudgePattern(pattern, a, b) {
    let smudgePattern = [];
    for (let i = 0; i < pattern.length; i++) {
        if (i !== a) {
            smudgePattern.push(pattern[i])
            continue;
        }

        let smudgeLine = pattern[i];
        let smudgeChar = pattern[i][b];
        if (smudgeChar === '#') {
            smudgeChar = '.';
        } else {
            smudgeChar = '#';
        }

        smudgeLine = smudgeLine.substring(0, b) + smudgeChar + smudgeLine.substring(b + 1, smudgeLine.length);
        smudgePattern.push(smudgeLine);
    }
    return smudgePattern;
}

function getVReflections(pattern, skip) {
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
        // console.log('match cols ' + a + ' ' + b);

        if (a === 0 || b === pattern[0].length - 1) {
            return true;
        }

        return reflect(a - 1, b + 1);
    }

    for (let i = 0; i < pattern[0].length - 1; i++) {
        let res = reflect(i, i + 1);
        if (res) {
            if (skip == null || i + 1 !== skip) {
                return i + 1;
            }
        }
    }
    return 0;
}

function getHReflections(pattern, skip) {
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
        // console.log('match rows ' + a + ' ' + b);

        if (a === 0 || b === pattern.length - 1) {
            return true;
        }

        return reflect(a - 1, b + 1);
    }

    for (let i = 0; i < pattern.length - 1; i++) {
        let res = reflect(i, i + 1);
        if (res) {
            if (skip == null || i + 1 !== skip) {
                return i + 1;
            }
        }
    }
    return 0;
}