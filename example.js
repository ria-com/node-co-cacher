var co = require('co'),
    wait = require('co-wait'),
    cacher = require('./'),
    expires = 180; // 3 minutes

var testGenerator = function* testGenerator (a) {
    yield wait(1000);
    return a+1;
};

co(function *(){
    var result = yield cacher(testGenerator, [4], expires);
    console.log(result); // wait 1 sec and get '5'
    result = yield cacher(testGenerator, [4], { expires: expires });
    console.log(result); // get '5' from cache immediately
}).catch(function(e) {throw e; });
