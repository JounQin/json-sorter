'use strict';

const JSON3 = require('json3');
const _ = require('underscore');

module.exports = (function () {
    const DEFAULT_OPTIONS = {
        parse: true
    };

    return function jsonSorter(json, options) {
        options = _.extend({}, DEFAULT_OPTIONS, options);

        if (_.isString(json)) {
            let parse = options.parse;
            if (!parse) return json;

            if (_.isFunction(parse)) {
                json = parse(json);
            } else {
                try {
                    json = JSON3.parse(json);
                } catch (e) {
                    return json;
                }
            }
        } else if (_.isUndefined(json) || _.isNull(json) || _.isNumber(json)) {
            return json;
        }

        let result;

        if (_.isArray(json)) {
            result = [];
            json.sort(options.compare).forEach(function (item) {
                item = jsonSorter(item, options);
                try {
                    item = JSON3.parse(item);
                } catch (e) {
                }
                result.push(item);
            });
        } else {
            result = {};
            Object.keys(json).sort(options.compare).forEach(function (key) {
                let value = json[key];
                if (value !== null && typeof value === 'object') {
                    value = JSON3.parse(jsonSorter(value, options));
                }
                result[key] = value;
            });
        }

        return JSON3.stringify(result);
    }
})();