const input = JSON.parse(require('./dec19_input').vals);

// const input = [
//     'px{a<2006:qkq,m>2090:A,rfg}',
//     'pv{a>1716:R,A}',
//     'lnx{m>1548:A,A}',
//     'rfg{s<537:gd,x>2440:R,A}',
//     'qs{s>3448:A,lnx}',
//     'qkq{x<1416:A,crn}',
//     'crn{x>2662:A,R}',
//     'in{s<1351:px,qqz}',
//     'qqz{s>2770:qs,m<1801:hdj,R}',
//     'gd{a>3333:R,R}',
//     'hdj{m>838:A,pv}',
//     '',
//     '{x=787,m=2655,a=1222,s=2876}',
//     '{x=1679,m=44,a=2067,s=496}',
//     '{x=2036,m=264,a=79,s=2244}',
//     '{x=2461,m=1339,a=466,s=291}',
//     '{x=2127,m=1623,a=2188,s=1013}',
// ];

let i = 0;
let flows = {};
for (; i < input.length; i++) {
    
    if (input[i].length === 0) {
        i++;
        break;
    }

    let flow = input[i];
    flow = flow.split('{');
    let flowName = flow[0];
    flow = flow[1];
    flow = flow.substring(0, flow.length - 1);
    flow = flow.split(',');

    flow = flow.map(f => {
        if (f.indexOf(':') >= 0) {
            f = f.match(/(.*)([<>])(.*):(.*)/);
            return {
                cat: f[1],
                compare: f[2],
                value: parseInt(f[3]),
                action: f[4],
            };
        } else {
            return {
                action: f
            };
        }
    })

    flows[flowName] = flow;
}

// console.log(flows);

function runFlow(flowName, possibleParts) {
    let flow = flows[flowName];

    let res = 0;
    for (let i = 0; i < flow.length; i++) {
        let rule = flow[i];

        if (possibleParts == null) {
            break;
        }

        let match;
        if (rule.compare != null) {
            let catIdx = "xmas".indexOf(rule.cat);
            match = [...possibleParts];
            if (rule.compare === '>') {
                match[catIdx] = [rule.value + 1, match[catIdx][1]];
                possibleParts[catIdx] = [possibleParts[catIdx][0], rule.value];
            } else {
                match[catIdx] = [match[catIdx][0], rule.value - 1];
                possibleParts[catIdx] = [rule.value, possibleParts[catIdx][1]];
            }
            if (match[catIdx][1] < match[catIdx][0]) {
                match = null;
            }
            if (possibleParts[catIdx[1]] < possibleParts[catIdx[0]]) {
                possibleParts = null;
            }
        } else {
            match = possibleParts;
        }

        if (match != null) {
            if (rule.action === 'A') {
                res += match.map(p => p[1] - p[0] + 1).reduce((a, p) => a * p, 1);
            } else if (rule.action !== 'R') {
                res += runFlow(rule.action, match);
            }
        }
    }
    return res;
}

let res = runFlow('in', [
    [1, 4000],
    [1, 4000],
    [1, 4000],
    [1, 4000],
]);

console.log(res);

// parts = parts.filter(p => runFlow('in', p));

// let sum = parts.reduce((a, p) => a + p.x + p.m + p.a + p.s, 0);
// console.log(sum);