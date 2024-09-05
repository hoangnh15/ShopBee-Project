const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

// Cấu hình kết nối
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      ca: fs.readFileSync(process.env.SSL_CA_PATH).toString(), 
      rejectUnauthorized: true 
    }
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);

    // Thực hiện truy vấn phiên bản MySQL
    connection.query('SELECT VERSION()', (error, results) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return;
        }
        console.log('MySQL Version:', results[0]['VERSION()']);
    });
  });
  
module.exports = connection;