const input = JSON.parse(require('./dec08_input').vals);

// const input = [
//     "LR",
//     "",
//     "11A = (11B, XXX)",
//     "11B = (XXX, 11Z)",
//     "11Z = (11B, XXX)",
//     "22A = (22B, XXX)",
//     "22B = (22C, 22C)",
//     "22C = (22Z, 22Z)",
//     "22Z = (22B, 22B)",
//     "XXX = (XXX, XXX)",
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


let curNodes = Object.keys(nodes).filter(n => n.substr(-1) === "A");
console.log(curNodes);

let loopLen = [];
curNodes.forEach(curNode => {
    let steps = 0;
    while (true) {
        steps++;
    
        let curDir = leftright[(steps - 1) % leftright.length];
        // console.log('curDir: ' + curDir);
    
        if (curDir === "L") {
            curNode = nodes[curNode][0];
        } else {
            curNode = nodes[curNode][1];
        }
    
        if (curNode.substr(-1) === "Z") {
            break;
        }
    }
   loopLen.push(steps);
});

// i just took this array and found the LCD "elsewhere"
console.log(loopLen.join(' '));