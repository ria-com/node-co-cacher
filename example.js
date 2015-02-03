var co = require('co'),
    wait = require('co-wait'),
    cacher = require('./');

var testGenerator = function* testGenerator (a) {
    yield wait(1000);
    return a+1;
};

co(function *(){
    var result = yield cacher(testGenerator, [4], 180, '');
    console.log(result);
}).catch(function(e) {throw e; });
