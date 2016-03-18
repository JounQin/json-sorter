# json-sorter
Extracting a sorted result from a given JSON object and stringify with JSON3.

# Usage
``` javascript

'use srtrict';

const jsonSorter = require('json-sorter');

jsonSorter(json [,sortFunc]);

```

If you don't pass a *sortFunc* parameter, the json with be sorted according to the dictionary.

The parameter *sortFunc* with be used to sort the keys of the parsed object like `Array.prototype.sort`.

See [Array.prototype.sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more information.


--

Yeah, it's very simple.

# License
MIT License (Expat)