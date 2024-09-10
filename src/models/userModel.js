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

exports.getUser = (userId, callback) => {
  userId = parseInt(userId);
  connection.query('SELECT *   FROM Users WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results[0]);
  });
};

exports.updateUserInfomation =(userId, userData, callback) => {
  userId = parseInt(userId);
  const fields = Object.keys(userData).map(key => `${key} = ?`).join(', ');
  const values = Object.values(userData).concat(userId);
  connection.query(`UPDATE Users SET ${fields} WHERE user_id = ?  `, values, (err, results)=> {
    if (err) {
      return callback(err + fields +" "+ values, null);
    }
    return callback(null, results);
  });
};

exports.GetUserRole =(userId, callback) =>{
  this.getUser(userId,(err, results)=>{
    if (err) {
      return callback(err,null);
    }
    return callback(null, results.role);
  });
};