const connection = require('../../config/database');


const GetBrand = (callback) => {
    const query = 'SELECT brand_id,brand_name,description FROM Brands ';
    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null,results); 
    });
};

module.exports = {
    GetBrand
};