require('dotenv').config();
const { createClient } = require('redis');

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOSTNAME,
        port: 13525
    }
});
client.on('connect', () => {
    console.log('Connected to Redis server successfully!');
});

client.on('error', (err) => {
    console.error('Error connecting to Redis server:', err);
});

if (!client.isOpen) {
    client.connect();
}

module.exports =  client;