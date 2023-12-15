const input = JSON.parse(require('./dec15_input').vals);

// const input = [
//     "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
// ];

let strings = input[0].split(',');

// function hash(str) {
//     let cur = 0;
//     for (let i = 0; i < str.length; i++) {
//         cur += str[i].charCodeAt();
//         cur = cur * 17;
//         cur = cur % 256;
//     }
//     return cur;
// }

function hash(str) {
    return str.split('').reduce((s, c) => ((s + c.charCodeAt()) * 17) % 256, 0);
}

let boxes = [];
for (let i = 0; i < strings.length; i++) {
    let lense = strings[i];

    if (lense.indexOf('=') >= 0) {
        lense = lense.split('=');
        let label = lense[0];
        let focal = parseInt(lense[1]);
        let boxNum = hash(label);

        if (boxes[boxNum] == null) {
            boxes[boxNum] = [];
        }
        box = boxes[boxNum];

        let existing = box.findIndex(l => l[0] === label);
        if (existing >= 0) {
            box[existing][1] = focal;
        } else {
            box.push([label, focal]);
        }
    } else {
        // assume -
        let label = lense.substring(0, lense.length - 1);
        let boxNum = hash(label);

        if (boxes[boxNum] == null) {
            continue;
        }
        box = boxes[boxNum];
        if (box.length === 0) {
            continue;
        }

        let existing = box.findIndex(l => l[0] === label);
        if (existing >= 0) {
            console.log('remove ' + label)
            boxes[boxNum] = [...box.slice(0, existing), ...box.slice(existing + 1, box.length)];
        }
    }
}
console.log(boxes);

let sum = 0;
for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];

    if (box == null || box.length === 0) {
        continue;
    }

    for (let j = 0; j < box.length; j++) {
        sum += (i + 1) * (j + 1) * (box[j][1]);
    }
}
console.log(sum);