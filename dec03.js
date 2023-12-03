const input = JSON.parse(require('./dec03_input').vals);

const zero = "0".charCodeAt();

let sum = 0;

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
        } else if (curNum != null) {
            curNumEnd = j;

            let valid = false;
            // takes advantage of the fact that in Javascript, it's okay
            // to read out of bounds of an array (even using a negative number),
            // you just get an `undefined`
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

                    if (neighborChar == null) {
                        continue;
                    }

                    if (neighborChar == '.') {
                        continue;
                    }
                    valid = true;
                }
            }

            if (valid == true) {
                sum += curNum;
            }

            curNum = null;
        }
    }
}

console.log(sum); // 556057