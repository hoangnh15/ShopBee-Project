const session = require('express-session');
const RedisStore = require('connect-redis').default; 

const redisClient = require('./redisConfig'); 

module.exports = {
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    cookie: { maxAge: 60 * 60 * 1000 } 
};
