const input = JSON.parse(require('./dec05_input').vals);

// const input = [
//     "seeds: 79 14 55 13",
//     "",
//     "seed-to-soil map:",
//     "50 98 2",
//     "52 50 48",
//     "",
//     "soil-to-fertilizer map:",
//     "0 15 37",
//     "37 52 2",
//     "39 0 15",
//     "",
//     "fertilizer-to-water map:",
//     "49 53 8",
//     "0 11 42",
//     "42 0 7",
//     "57 7 4",
//     "",
//     "water-to-light map:",
//     "88 18 7",
//     "18 25 70",
//     "",
//     "light-to-temperature map:",
//     "45 77 23",
//     "81 45 19",
//     "68 64 13",
//     "",
//     "temperature-to-humidity map:",
//     "0 69 1",
//     "1 0 69",
//     "",
//     "humidity-to-location map:",
//     "60 56 37",
//     "56 93 4",
//     "",
// ];

let seeds = [];

let maps = [];
let curMap = -1;

for (let i = 0; i < input.length; i++) {
    let line = input[i];
    console.log(line);
    if (i == 0) {
        seeds = line.split(':')[1].trim().split(' ').map(s => parseInt(s));
        continue;
    }

    if (line.trim().length === 0) {
        continue;
    }

    if (line.indexOf(':') >= 0) {
        curMap++;
        maps[curMap] = [];
        continue;
    }

    maps[curMap].push(line.split(' ').map(s => parseInt(s)));
}

function map(val, maps) {
    for (let map of maps) {
        let source = map[1];
        let dest = map[0];
        let range = map[2];
        if (val >= source && val < source + range) {
            return dest + (val - source);
        }
    }

    return val;
}

let minLocation = null;
for (let i = 0; i < seeds.length; i += 2) {
    let seedStart = seeds[i];
    let seedCount = seeds[i + 1];

    for (let curSeed = seedStart; curSeed < seedStart + seedCount; curSeed++) {
        let seed = curSeed;
        for (let j = 0; j < maps.length; j++) {
            seed = map(seed, maps[j]);
        }
        if (minLocation == null) {
            minLocation = seed;
        } else if (seed < minLocation) {
            minLocation = seed;
        }
    }
}

// console.log(seeds);
// console.log(maps);

console.log(minLocation);

// console.log(map(98, maps[0]));
// console.log(map(99, maps[0]));
// console.log(map(100, maps[0]));
// console.log(map(14, maps[0]));
// console.log(map(55, maps[0]));