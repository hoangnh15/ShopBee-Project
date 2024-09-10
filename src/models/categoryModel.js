const connection = require('../../config/database');


const GetCategory = (callback) => {
    const query = 'SELECT category_id,category_name,description FROM Categories ';
    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null,results); 
    });
};

module.exports = {
    GetCategory
};