/**
 * @module co-cacher
 */
(function () {
    "use strict";
    var config = require('config'),
        utils = require("cacher-utils"),
        cacheStorage = utils.getCacheStorage();

    /**
     * Cahe wrapper
     *
     * @param {(function|generator)} myGenerator
     * @param {Array} args
     * @param {number|object} options (if number options = expires)
     * @return {*}
     *
     * @example
     * var co = require('co'),
     *     wait = require('co-wait'),
     *     cacher = require('co-cacher');
     *
     * var testGenerator = function* testGenerator (a) {
     *     yield wait(1000);
     *     return a+1;
     * };
     *
     * co(function *(){
     *     var result = yield cacher(testGenerator, [4], {expires: 30});
     *     console.log(result);
     * }).catch(function(e) {throw e; });
     *
     */
    module.exports = function* (myGenerator, args, options) {
        if (typeof options == 'object') {
        } else {
            var expires = options;
            options = {};
            options.expires = expires;
        }
        var time = options.expires || config.cache.expires;
        var salt = options.salt || '';
        var key = utils.keyMaker(myGenerator.name, salt, args);

        var value = yield cacheStorage.get(key);

        if (typeof value != 'undefined') {
            return value;
        }
        var data = yield myGenerator.apply(null,args);
        cacheStorage.set(key,data,time).catch(function (error) {
            console.warn('Cacher error -->', error.toString(), myGenerator.name, args, options);
        });
        return data;
    }
}());
