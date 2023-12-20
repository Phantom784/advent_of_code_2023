// const input = JSON.parse(require('./dec19_input').vals);

const input = [
    'px{a<2006:qkq,m>2090:A,rfg}',
    'pv{a>1716:R,A}',
    'lnx{m>1548:A,A}',
    'rfg{s<537:gd,x>2440:R,A}',
    'qs{s>3448:A,lnx}',
    'qkq{x<1416:A,crn}',
    'crn{x>2662:A,R}',
    'in{s<1351:px,qqz}',
    'qqz{s>2770:qs,m<1801:hdj,R}',
    'gd{a>3333:R,R}',
    'hdj{m>838:A,pv}',
    '',
    '{x=787,m=2655,a=1222,s=2876}',
    '{x=1679,m=44,a=2067,s=496}',
    '{x=2036,m=264,a=79,s=2244}',
    '{x=2461,m=1339,a=466,s=291}',
    '{x=2127,m=1623,a=2188,s=1013}',
];

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

console.log(flows);

let parts = [];
for (; i < input.length; i++) {
    let part = input[i];
    part = part.substring(1, part.length - 1);
    part = part.split(',');
    part = part.map(p => p.split('='));

    let partDict = {};
    part.forEach(p => {
        partDict[p[0]] = parseInt((p[1]));
    });

    parts.push(partDict);
}

function runFlow(flowName, part) {
    let flow = flows[flowName];

    for (let i = 0; i < flow.length; i++) {
        let rule = flow[i];
        if (rule.compare != null) {
            if (rule.compare === '>') {
                if (part[rule.cat] <= rule.value) {
                    continue;
                }
            } else {
                if (part[rule.cat] >= rule.value) {
                    continue;
                }
            }
        }

        if (rule.action === 'A') {
            return true;
        }

        if (rule.action === 'R') {
            return false;
        }

        return runFlow(rule.action, part);
    }
}

parts = parts.filter(p => runFlow('in', p));

let sum = parts.reduce((a, p) => a + p.x + p.m + p.a + p.s, 0);
console.log(sum);