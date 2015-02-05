module.exports = {
    // https://github.com/3rd-Eden/node-memcached
    memcached: {
        servers: 'localhost:11211', // You can either use: String, Array, Object
        options: {
            poolSize: 20
        }
    },
    redis: {
        options: 'tcp://localhost:6379' // may be object see https://github.com/mjackson/then-redis
    },
    cache: {
        expires: 120, // Default cache expires in seconds
        storage: 'ee',
        key: {
            prefix: 'cw_',
            crc32: false
        }
    }
};