/**
 * @module cache-wrapper
 */
(function () {
    "use strict";
    var config = require('config'),
        crc = require('crc'),
        qMemcached = require('memcache-promise'),
        memcached = new qMemcached(
            config.memcached.servers,
            config.memcached.options
        );

    var keyMaker = function(name , salt, args) {
        var suffix = args.join('_');
        if (config.cache.key.crc32) {
            suffix = crc.crc32(suffix).toString(16);
        }
        return config.cache.key.prefix + name + salt + suffix;
    };

    /**
     * Cahe wrapper
     *
     * @param {(function|generator)} myGenerator
     * @param {Array} args
     * @param {number|object} options (if number options = cacheTime)
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
     *     var result = yield cacher(testGenerator, [4], {cacheTime: 30});
     *     console.log(result);
     * }).catch(function(e) {throw e; });
     *
     */
    module.exports = function* (myGenerator, args, options) {
        if (typeof options == 'object') {
        } else {
            var cacheTime = options;
            options = {};
            options.cacheTime = cacheTime;
        }
        var time = options.cacheTime || config.cache.defaultTime;
        var salt = options.salt || '';
        var key = keyMaker(myGenerator.name, salt, args);
        var value = yield memcached.get(key);

        if (value) {
            return value;
        }
        var data = yield myGenerator.apply(null,args);
        memcached.set(key,data,time).done();
        return data;
    }
}());
