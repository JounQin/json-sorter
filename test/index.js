'use strict';

const _ = require('underscore');
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

console.log('\ncomplex array and object json:\n',
    jsonSorter([{key: 1}, {key: 3}, {key: 2}, {key: {c: 1, d: 2, a: 3, b: 4}}], {
        compare: function (x, y) {
            if (_.isObject(x)) {
                return x.key < y.key;
            }

            return x < y;
        }
    }));


const json = '{"x":[{"b":"[5,3,1,4,2]"}]}';

console.log('------------------------------------------------------');

let result = jsonSorter(json, {
    stringify: false
});

console.log('first:', result);
console.log('type:', typeof result);
console.log(result.x[0].b);