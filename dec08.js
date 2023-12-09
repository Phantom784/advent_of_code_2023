const input = JSON.parse(require('./dec08_input').vals);

// const input = [
//     "LLR",
//     "",
//     "AAA = (BBB, BBB)",
//     "BBB = (AAA, ZZZ)",
//     "ZZZ = (ZZZ, ZZZ)",
// ];

const leftright = input[0].split('');
console.log(leftright);

const nodes = {};

for (let i = 2; i < input.length; i++) {
    console.log(input[i]);
    let nodeInfo = input[i].split(' = ');
    let node = nodeInfo[0];
    let nodeNext = nodeInfo[1];
    nodeNext = nodeNext.substr(1, nodeNext.length - 2);
    nodeNext = nodeNext.split(', ');

    if (nodes[node] != null) {
        console.log('DUPE NODE!!!!');
    }

    nodes[node] = nodeNext;
}

console.log(nodes);

let steps = 0;
let curNode = "AAA";
while (true) {
    steps++;

    let curDir = leftright[(steps - 1) % leftright.length];
    console.log('curDir: ' + curDir);

    if (curDir === "L") {
        curNode = nodes[curNode][0];
    } else {
        curNode = nodes[curNode][1];
    }

    if (curNode === "ZZZ") {
        break;
    }
}
console.log(steps);