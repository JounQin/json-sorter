'use strict';

const jsonSorter = require('..');

console.log('it should return key-sorted json strings');

console.log('\nsimple object:\n',
    jsonSorter({
        d: 1,
        a: 2,
        c: 3,
        b: 4
    }));

console.log('\ncomplex object:\n',
    jsonSorter({
        d: 1,
        a: {
            z: 6,
            x: 7,
            y: 8
        },
        c: 3,
        b: 4
    }));

console.log('\nmore complex object:\n',
    jsonSorter({
        d: 1,
        a: {
            z: {
                'c/1': 10,
                'b/2': 11,
                'a/3': 12
            },
            x: 7,
            y: 8
        },
        c: 3,
        b: 4
    }));

console.log('\nmore complex object with user-defined sort-function:\n',
    jsonSorter({
        d: 1,
        a: {
            z: {
                'c/1': 10,
                'b/2': 11,
                'a/3': 12
            },
            x: 7,
            y: 8
        },
        c: 3,
        b: 4
    }, function (x, y) {
        return x < y
    }));
