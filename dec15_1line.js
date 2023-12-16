const input = JSON.parse(require('./dec15_input').vals)[0];

console.log(input.split(',').reduce((s, l) => s + l.split('').reduce((s, c) => ((s + c.charCodeAt()) * 17) % 256, 0), 0));