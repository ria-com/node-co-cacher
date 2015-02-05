var co = require('co'),
    wait = require('co-wait'),
    cacher = require('../'),
    // Емуляція важкого запиту у ms (1 sec)
    fakeDalay = 1000;


var testFunction = function* testFunction (a) {
    yield wait(fakeDalay);
    return a+1;
};

describe('myDB Tests', function () {
    it("takes a long time", function(done) {
        co(function *(){
            var a = 10;

            var start = new Date();
            var result = yield cacher(testFunction, [a],3);
            expect((new Date()) - start).toBeGreaterThan(fakeDalay);
            expect(result).toEqual(a+1);


            start = new Date();
            result = yield cacher(testFunction, [a], {expires : 3});
            expect(result).toEqual(a+1);
            expect((new Date()) - start).toBeLessThan(fakeDalay);
        }).then(done);
    });
});

