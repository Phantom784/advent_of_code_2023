const input = JSON.parse(require('./dec03_input').vals);

const zero = "0".charCodeAt();

let sum = 0;

let gears = {};

for (let i = 0; i < input.length; i++) {
    let line = input[i];

    let curNum = null;
    let curNumStart;
    let curNumEnd;

    for (let j = 0; j <= line.length; j++) {
        let char = line[j];
        let charCode = char == null ? 0 : char.charCodeAt();
        if (charCode >= zero && charCode <= zero + 9) {
            if (curNum == null) {
                curNumStart = j - 1;
                curNum = parseInt(char)
            } else {
                curNum = curNum * 10 + parseInt(char);
            }
        } else {
            if (curNum != null) {
                curNumEnd = j;

                let gearPos = null;
                let gearOverflow = false;
                for (let ii = i - 1; ii <= i + 1; ii++) {
                    if (input[ii] == null) {
                        continue;
                    }

                    for (let jj = curNumStart; jj <= curNumEnd; jj++) {
                        if (ii == i) {
                            // don't look at the digits themselves
                            if (jj != curNumStart && jj != curNumEnd) {
                                continue;
                            }
                        }

                        let neighborChar = input[ii][jj];

                        if (neighborChar == '*') {
                            // in case a number has more than one adjacent gear
                            // but this didn't actually come up in the input
                            if (gearPos != null) {
                                gearOverflow = true;
                            }
                            gearPos = ii + ':' + jj;
                        }
                    }
                }

                if (!gearOverflow && gearPos != null) {
                    let gearKey = gearPos;

                    if (gears[gearKey] == null) {
                        gears[gearKey] = [];
                    }
                    gears[gearKey].push(curNum);
                }

                curNum = null;
            }
        }
    }
}

for (let gearKey of Object.keys(gears)) {
    let vals = gears[gearKey];

    if (vals.length == 2) {
        sum += (vals[0] * vals[1]);
    }
}

console.log(sum); // 82824352