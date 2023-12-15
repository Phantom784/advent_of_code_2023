const input = JSON.parse(require('./dec12_input').vals);

// const input = [
//     "???.### 1,1,3",
//     ".??..??...?##. 1,1,3",
//     "?#?#?#?#?#?#?#? 1,3,1,6",
//     "????.#...#... 4,1,1",
//     "????.######..#####. 1,6,5",
//     "?###???????? 3,2,1",
// ];

const repeats = 5;

let memo = {};

let tries = 0;  // for debugging

let sum = 0;
for (let i = 0; i < input.length; i++) {
    memo = {};

    let line = input[i].split(' ');

    let springsArr = [];
    for (let r = 0; r < repeats; r++) {
        springsArr.push(line[0]);
    }
    let springs = springsArr.join('?');
    console.log(springs);

    let groupsArr = [];
    for (let r = 0; r < repeats; r++) {
        groupsArr.push(line[1]);
    }

    let groups = groupsArr.join(',').split(',').map(g => parseInt(g));
    console.log(groups);
    res = solve(springs, groups);
    console.log('TOTAL: ' + res);
    console.log(memo);
    sum += res;
    console.log('='.repeat(20));
}
console.log('TRIES: ' + tries);
console.log(sum);

function solve(springs, groups) {
    if (groups.length === 0) {
        return 1;
    }
    
    let key = springs + groups.join(',');
    
    if (memo[key] != null) {
        return memo[key];
    }

    let brokenTotal = groups.reduce((a, b) => a + b, 0);
    // console.log('brokenTotal: ' + brokenTotal); 

    let maxBrokenGroup = groups.reduce((a, b) => Math.max(a, b),0);
    // console.log('maxBrokenGroup: ' + maxBrokenGroup);

    function scan(springs) {
        //console.log(springs);
        tries++;

        let curBrokenTotal = springs.split('').filter(c => c === '#').length;
        let curUnknownTotal = springs.split('').filter(c => c === '?').length;
        //let curGapTotal = springs.split('').filter(c => c === '.').length;
        // console.log('curBrokenTotal: ' + curBrokenTotal);
        // console.log('curUnknownTotal: ' + curUnknownTotal);

        // prune if we have too many broken springs
        if (curBrokenTotal > brokenTotal) {
            return 0;
        }

        // prune if not enough unknowns
        if (curBrokenTotal + curUnknownTotal < brokenTotal) {
            return 0;
        }

        // prune if there's any groups of the wrong size
        let curSize = 0;
        let curGroup = 0;
        let knownPos = 0;
        for (let i = 0; i < springs.length; i++) {
            if (springs[i] === '?') {
                break;
            }

            if (springs[i] === '#') {
                curSize++;
                // bigger than any group, bail right away
                if (curSize > maxBrokenGroup) {
                    return 0;
                }

                if (curSize > groups[curGroup]){
                    return 0;
                }
                
            } else if (curSize > 0) {
                if (curSize != groups[curGroup]) {
                    return 0;
                }
                knownPos = i;
                curSize = 0;
                curGroup++;
            }
        }

        // prune if remaining groups won't fit
        let broken = 0;
        let gaps = 0;
        let unknown = 0;
        let curGroups = groups.slice(curGroup + 1);
        let brokenNeeded = curGroups.reduce((a, b) => a + b, 0);
        let gapsNeeded = curGroups.length - 1;
        for (let i = springs.indexOf('?'); i < springs.length; i++) {
            if (springs[i] === '#') {
                broken++;
            }

            if (springs[i] === '.') {
                gaps++;
            }

            if (springs[i] === '?') {
                unknown++;
            }
        }

        let ukBroken = brokenNeeded - broken;
        let ukGaps = gapsNeeded - gaps;

        if (unknown < ukBroken + ukGaps) {
            return 0;
        }

        // if we just found a group, call the top-level "solve" again
        let missingGroups = groups.slice(curGroup);
        if (missingGroups.length < groups.length) {
            const firstUk = knownPos;
            if (firstUk >= 0) {
                // console.log('RECURSING!');
                // console.log(springs);
                // console.log(groups);
                // console.log(springs.substring(firstUk));
                // console.log(missingGroups);
                let res = solve(springs.substring(firstUk), missingGroups);
                // console.log(res);
                return res;
            }
        }

        if (springs.split('').filter(c => c === '?').length > 0)
        {
            for (let i = 0; i < springs.length; i++) {
                if (springs[i] === '?') {
                    // branch, try both possibilities
                    let fixed = springs.substring(0, i) + '.' + springs.substring(i + 1, springs.length);
                    let broken = springs.substring(0, i) + '#' + springs.substring(i + 1, springs.length);
                    let a = scan(fixed);
                    let b = scan(broken);
                    return a + b;
                }
            }
        } else {
            //console.log(springs);
            let curGroups = [];
            let curGroup = 0;
            for (let i = 0; i < springs.length; i++) {
                let curChar = springs[i];

                if (curChar === '#') {
                    curGroup++;
    
                    if (i === springs.length - 1) {
                        curGroups.push(curGroup);
                        curGroup = 0;
                    }
                } else if (curGroup > 0) {
                    curGroups.push(curGroup);
                    curGroup = 0;
                }
            }
            if (curGroups.length === groups.length
                && curGroups.every((c, pos) => groups[pos] === c)) {
                    return 1;
            }
            return 0;
        }
    }
    
    let res = scan(springs);
    memo[key] = res;
    return res;
}
