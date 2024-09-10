const session = require('express-session');
const RedisStore = require('connect-redis').default; 

const redisClient = require('./redisConfig'); 

module.exports = {
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
        client: redisClient,
        ttl: 30 * 60
    }),
    cookie: { maxAge: 30 * 60 * 1000 } 
};
