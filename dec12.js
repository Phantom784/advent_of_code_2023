const input = JSON.parse(require('./dec12_input').vals);

// const input = [
//     "???.### 1,1,3",
//     ".??..??...?##. 1,1,3",
//     "?#?#?#?#?#?#?#? 1,3,1,6",
//     "????.#...#... 4,1,1",
//     "????.######..#####. 1,6,5",
//     "?###???????? 3,2,1",
// ];

let max = 0;
let sum = 0;
for (let i = 0; i < input.length; i++) {
    // console.log(' ');
    let line = input[i].split(' ');
    let springs = line[0];
    let groups = line[1].split(',').map(g => parseInt(g));
    // console.log(groups);

    let ukCount = springs.split('').filter(c => c === '?').length;
    max = Math.max(max, ukCount);

    for (let j = 0; j < 2 ** ukCount; j++) {
        let bits = j.toString(2);
        bits = '0'.repeat(ukCount - bits.length) + bits;
        // console.log(bits);

        let curGroups = [];
        let curGroup = 0;

        let curUk = 0;
        for (let k = 0; k < springs.length; k++) {
            let spring = springs[k];

            if (spring === '?') {
                spring = bits[curUk] === "1" ? "#" : ".";
                curUk++;
            }

            if (spring === '#') {
                curGroup++;

                if (k === springs.length - 1) {
                    curGroups.push(curGroup);
                    curGroup = 0;
                }
            } else if (curGroup > 0) {
                curGroups.push(curGroup);
                curGroup = 0;
            }
        }
        // console.log(curGroups);
        if (curGroups.length === groups.length
            && curGroups.every((c, pos) => groups[pos] === c)) {
                sum++;
        }
    }
}
console.log(sum);
// console.log(max);