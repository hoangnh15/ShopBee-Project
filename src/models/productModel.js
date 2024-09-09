const connection = require('../../config/database');

// Hàm lấy tất cả các sản phẩm theo category_id
const getProductsByCategory = (categoryId, callback) => {
    const query = 'SELECT * FROM Products WHERE category_id = ?';
    connection.query(query, [categoryId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Hàm lấy sản phẩm theo product_name
const getProductByName = (productName, callback) => {
    const query = 'SELECT * FROM Products WHERE product_name = ?';
    connection.query(query, [productName], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0]);  // Giả sử chỉ có 1 sản phẩm theo tên
    });
};

module.exports = {
    getProductsByCategory,
    getProductByName
};
