const connection = require('../../config/database');

exports.addressGetByUser = (userId, callback) => {
    userId = parseInt(userId);
    connection.query('SELECT * FROM Addresses WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
};
exports.insertAddress = (userId, userData, callback) => {
    userId = parseInt(userId);
    userData.user_id = userId;
    const checkDuplicateSql = `
    SELECT * FROM Addresses 
    WHERE user_id = ? AND province = ? AND district = ? AND ward = ? AND detail_addr = ?`;
    const checkDuplicateValues = [
        userId,
        userData.province,
        userData.district,
        userData.ward,
        userData.detail_addr
    ];
    connection.query(checkDuplicateSql, checkDuplicateValues, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length > 0) {
            return callback(null, { message: 'Địa chỉ trùng lặp. Không thể thêm.' });
        }
        const columns = Object.keys(userData).join(', ');
        const placeholders = Object.keys(userData).map(() => '?').join(', ');
        const sql = `INSERT INTO Addresses (${columns}) VALUES (${placeholders})`;
        const values = Object.values(userData);

        connection.query(sql, values, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    });
};

exports.updateAddress = (address_id, userData, callback) => {
    address_id = parseInt(address_id);
    
    // Kiểm tra địa chỉ update có mặc định?
    if (userData.isDefault == 1) {
        // Lấy user_id từ địa chỉ hiện tại
        connection.query('SELECT user_id FROM Addresses WHERE address_id = ?', [address_id], (err, results) => {
            if (err) {
                return callback(err, null);
            }

            // lỗi
            if (results.length === 0) {
                return callback(new Error('Address not found'), null);
            }

            const user_id = results[0].user_id;

            // Cập nhật tất cả các địa chỉ khác của user_id -> không phải mặc định
            connection.query('UPDATE Addresses SET isDefault = 0 WHERE user_id = ? AND address_id != ?', [user_id, address_id], (err) => {
                if (err) {
                    return callback(err, null);
                }

                // Tiếp tục cập nhật địa chỉ 
                const fields = Object.keys(userData).map(key => `${key} = ?`).join(', ');
                const values = Object.values(userData).concat(address_id);
                
                connection.query(`UPDATE Addresses SET ${fields} WHERE address_id = ?`, values, (err, results) => {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, results);
                });
            });
        });
    } else {
        // Cập nhật địa chỉ này nếu không là mặc định
        const fields = Object.keys(userData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(userData).concat(address_id);
        
        connection.query(`UPDATE Addresses SET ${fields} WHERE address_id = ?`, values, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }
};


