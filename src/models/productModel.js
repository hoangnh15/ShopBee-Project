const connection = require('../../config/database');
const userModel = require('./userModel');
exports.GetAllProduct = (userId, callback) => {

    userModel.GetUserRole(userId, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results === 'admin') {
            connection.query(`select v.variant_id, p.product_id, p.product_name,b.brand_name,c.category_name, v.origin_price, v.discount_percent, va.attr_id,a.type, a.attr_name, vs.quantity, p.brand_id, p.category_id
                                from Variants v Join Variant_attributes va ON v.variant_id = va.variant_id
                                join Products p ON v.product_id = p.product_id
                                join Brands b ON p.brand_id = b.brand_id
                                join Categories c ON c.category_id = p.category_id
                                join Variant_stock vs ON vs.variant_id = v.variant_id
                                join Attributes a ON va.attr_id = a.attr_id ;`
                , (err, results) => {
                    if (err) {
                        return callback(err, null);
                    }
                    //Xử lý dữ liệu:
                    // Nhóm dữ liệu theo variant_id
                    const groupedData = results.reduce((acc, item) => {
                        if (!acc[item.variant_id]) {
                            acc[item.variant_id] = [];
                        }
                        acc[item.variant_id].push(item);
                        return acc;
                    }, {});
                    // Định dạng dữ liệu
                    const formattedData = Object.values(groupedData).map(items => {
                        const base = { ...items[0] };
                        delete base.attr_id;
                        delete base.attr_name;
                        base.attributes = items.map(item => ({
                            attr_id: item.attr_id,
                            type: item.type,
                            attr_name: item.attr_name
                        }));
                        return base;
                    });
                    results = formattedData;
                    return callback(null, results);
                });

        }
        else {
            connection.query('SELECT *  FROM Products', (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, results);
            });
        }


    });

}; 