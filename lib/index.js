'use strict';

const JSON3 = require('json3');
const _ = require('underscore');

module.exports = (function () {
    
    const DEFAULT_OPTIONS = {
        parse: true,    // try to parse string to json object or array
        stringify: true // stringify the result json to string
    };

    function objOrArr(json) {
        return _.isObject(json) || _.isArray(json);
    }

    return function jsonSorter(json, options) {
        options = _.extend({}, DEFAULT_OPTIONS, options);

        if (_.isString(json)) {
            let parse = options.parse;
            if (!parse) return json;

            // if parameter `parse` is a function, just use it to parse the json string
            if (_.isFunction(parse)) {
                json = parse(json);
            } else {
                try {
                    json = JSON3.parse(json);
                } catch (e) {
                    // if JSON3.parse throw any exception, do noting
                    return json;
                }
            }
        } else if (!objOrArr(json)) {//number, boolean, function, etc.
            return json;
        }

        let result;

        if (_.isArray(json)) {
            result = [];

            json.sort(options.compare).forEach(function (item) {
                // if `options.stringify` is equal to *false* or `item` is object or array, sort it and don't stringify
                // remember do not overwrite the parameter `options`!
                result.push(jsonSorter(item, _.extend({}, options, {stringify: options.stringify && !objOrArr(item)})));
            });
        } else {
            result = {};
            
            Object.keys(json).sort(options.compare).forEach(function (key) {
                let value = json[key];
                // just like the `item` in array
                result[key] = jsonSorter(value, _.extend({}, options, {stringify: options.stringify && !objOrArr(value)}));
            });
        }

        return options.stringify ? JSON3.stringify(result) : result;
    }
    
})();