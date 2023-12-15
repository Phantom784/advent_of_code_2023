const input = JSON.parse(require('./dec15_input').vals);

console.log(input[0].split(',').reduce((s, l) => s + l.split('').reduce((s, c) => ((s + c.charCodeAt()) * 17) % 256, 0), 0));