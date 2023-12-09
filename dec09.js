const input = JSON.parse(require('./dec09_input').vals);

// const input = [
//     "0 3 6 9 12 15",
//     "1 3 6 10 15 21",
//     "10 13 16 21 30 45",
// ];

let sum = 0;
for (let i = 0; i < input.length; i++) {
    let vals = input[i].split(' ').map(v => parseInt(v));
    exVals = extrapolate(vals);
    console.log(exVals);
    sum += exVals[exVals.length - 1];
}
console.log(sum);

function extrapolate(vals) {
    console.log(vals);

    if (vals.filter(v => v === 0).length === vals.length) {
        vals.push(0);
        return vals;
    }

    let diffs = extrapolate(getDiffs(vals));
    console.log(diffs);
    vals.push(diffs[diffs.length - 1] + vals[vals.length - 1]);
    return vals;
}

function getDiffs(vals) {
    let res = [];
    for (let i = 0 ; i < vals.length - 1; i ++) {
        res.push(vals[i+1] - vals[i]);
    }
    return res;
}