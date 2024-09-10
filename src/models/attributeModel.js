const connection = require('../../config/database');


const GetAttributes = (callback) => {
    const query = 'SELECT attr_id,attr_name,type FROM Attributes ';
    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null,results); 
    });
};

module.exports = {
    GetAttributes
};