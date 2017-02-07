# json-sorter

[![Greenkeeper badge](https://badges.greenkeeper.io/JounQin/json-sorter.svg)](https://greenkeeper.io/)
Extracting a sorted result from a given JSON object or array even string, parse and stringify with [JSON3](https://github.com/bestiejs/json3).

# Usage
``` javascript

'use srtrict';

const jsonSorter = require('json-sorter');

jsonSorter(json [,options]);

```

The first parameter `json` could be an object or array, even a json string.

By default, `options.parse` is `true`, you can set it to `false` so that it will not try to parse string to object or array.
Of course you can pass an user-defined parse function which will trigger a json-string parameter.

`options.stringify` is used to judge whether to stringify the sorted result, and usually you don't need to set it.

If you don't set `options.compare`, the json with be sorted according to the dictionary. It with be used to sort the keys of the parsed object like `Array.prototype.sort`.

See [Array.prototype.sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more information.

---



A complex example is as follows:
``` javascript
const jsonSorter = require('json-sorter');
const _ = require('underscore');

jsonSorter([{key: 1}, {key: 3}, {key: 2}, {key: {c: 1, d: 2, a: 3, b: 4}}], {
    compare: function (x, y) {
        if (_.isObject(x)) {
            return x.key < y.key;
        }

        return x < y;
    }
}));

// outputs : '[{"key":3},{"key":2},{"key":1},{"key":{"d":2,"c":1,"b":4,"a":3}}]'
```


---

Yeah, as yo see it's very simple.

# License
MIT License (Expat)