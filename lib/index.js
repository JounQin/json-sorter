'use strict';

const JSON3 = require('json3');

module.exports = function jsonSorter(json, sortFunc) {
    if (typeof json === 'string') {
        json = JSON3.parse(json);
    }

    const finallyJSON = {};

    Object.keys(json).sort(sortFunc).forEach(function (key) {
        let value = json[key];
        if (value !== null && typeof value === 'object') {
            value = JSON3.parse(jsonSorter(value, sortFunc));
        }
        finallyJSON[key] = value;
    });

    return JSON3.stringify(finallyJSON);
};