const connection = require('../../config/database');

exports.findUserByUsername = (username, callback) => {
    connection.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results[0]);
  });
};

exports.createUser = (full_name, username, email, hashedPassword, callback) => {
    const query = 'INSERT INTO Users (full_name, username, email, password) VALUES (?, ?, ?, ?)';
    connection.query(query, [full_name, username, email, hashedPassword], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  };