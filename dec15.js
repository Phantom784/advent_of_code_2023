const input = JSON.parse(require('./dec15_input').vals);

// const input = [
//     "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
// ];

for (let i = 0; i < input.length; i++) {
    console.log(input[i]);
}

let strings = input[0].split(',');

function hash(str) {
    let cur = 0;
    for (let i = 0; i < str.length; i++) {
        cur += str[i].charCodeAt();
        cur = cur * 17;
        cur = cur % 256;
    }
    return cur;
}

let sum = 0;
for (let i = 0; i < strings.length; i++) {
    sum += hash(strings[i]);
}
console.log(sum);