node-co-cacher
===================

A simple middleware for [co](https://github.com/tj/co) library. 
Add cache opportunity for you function or generator 

example
===========

**Add cache cache opportunity for simple generator - testGenerator:**

```javascript
var co = require('co'),
    wait = require('co-wait'),
    cacher = require('co-cacher');

var testGenerator = function* testGenerator (a) {
    yield wait(1000);
    return a+1;
};

co(function *(){
    var result = yield cacher(testGenerator, [4]);
    console.log(result); // wait 1 sec and get '5'
    var result = yield cacher(testGenerator, [4]);
    console.log(result); // get '5' from cache
}).catch(function(e) {throw e; });
```


simple test
===========

**Start testing module:**

```sh
$ cd node-cache-wrapper
$ npm install
$ npm test
```


roadmap
=======

   * Add redis storage support
