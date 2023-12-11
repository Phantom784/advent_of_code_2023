const input = JSON.parse(require('./dec11_input').vals);

let sky = input.map(l => l.split(''));

// grow rows
for (let i = 0; i < sky.length; i++) {
    if (sky[i].every(c => c === '.')) {
        let curLine = sky[i];
        let newLine = '`'.repeat(curLine.length).split('');
        sky = [...sky.slice(0, i), newLine, ...sky.slice(i)];
        // skip the newly added line
        i++;
    }
}

// grow cols
for (let i = 0; i < sky[0].length; i++) {
    let dotCount = 0;
    for (let j = 0; j < sky.length; j++) {
        if (sky[j][i] === '.' || sky[j][i] === '`') {
            dotCount++;
        }
    }
    
    if (dotCount === sky.length) {
        for (let j = 0; j < sky.length; j++) {
            sky[j] = [...sky[j].slice(0, i), '`', ...sky[j].slice(i)];
        }
        // skip the newly added col
        i++;
    }
}

sky.forEach(l => console.log(l.join('')));

const expandUniv = 1000000;

let stars = [];
let iPos = 0;
for (let i = 0; i < sky.length; i++) {
    let jPos = 0;
    for (let j = 0; j < sky[0].length; j++) {
        if (sky[i][j] === '#') {
            stars.push([iPos, jPos]);
        }

        if (sky[i][j] === '`') {
            jPos += expandUniv - 1;
        } else {
            jPos++;
        }
    }

    if (sky[i].every(s => s === '`')) {
        iPos += expandUniv - 1;
    } else {
        iPos += 1;
    }
}

console.log(stars);

let totalDist = 0;
for (let i = 0; i < stars.length; i++) {
    let curStar = stars[i];
    for (let j = 0; j < stars.length; j++) {
        if (i <= j) {
            continue;
        }
        let compStar = stars[j];
        let rowDiff = Math.abs(curStar[0] - compStar[0]);
        let colDiff = Math.abs(curStar[1] - compStar[1]);
        totalDist += (rowDiff + colDiff);
    }
}
console.log(totalDist);