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
    result = yield cacher(testGenerator, [4]);
    console.log(result); // get '5' from cache immediately
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

config
======

co-cacher use [config](https://github.com/lorenwest/node-config) module. 
Example of config (./config/default.js):
```javascript
module.exports = {
    // https://github.com/3rd-Eden/node-memcached
    memcached: {
        servers: 'localhost:11211', // You can either use: String, Array, Object
        options: {
            poolSize: 20
        }
    },
    cache: {
        expires: 120, // Default cache expires in seconds
        storage: 'memcached',
        key: {
            prefix: 'cw_',
            crc32: false
        }
    }
};
```


roadmap
=======

   * Add redis storage support
