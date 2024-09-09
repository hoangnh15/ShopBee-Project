const productModel = require('../models/productModel');

// Hàm xử lý lấy sản phẩm theo danh mục
const getProductsByCategory = (req, res) => {
    const category = req.params.category;
    // Chuyển đổi category thành category_id (ví dụ: dien-thoai -> 1)
    const categoryMapping = {
        'dien-thoai': 1,
        'phu-kien': 2,
        'laptop': 3
    };

    const categoryId = categoryMapping[category];
    
    if (categoryId) {
        productModel.getProductsByCategory(categoryId, (err, products) => {
            if (err) {
                return res.status(500).send('Lỗi khi lấy sản phẩm từ cơ sở dữ liệu');
            }
            console.log(products);
            // Render template 'category' với dữ liệu sản phẩm từ database
            res.render('category', { products });
        });
    } else {
        res.status(404).send('Danh mục không hợp lệ');
    }
};

// Hàm xử lý lấy chi tiết sản phẩm theo tên sản phẩm
const getProductDetail = (req, res) => {
    const productName = req.params.product;

    productModel.getProductByName(productName, (err, product) => {
        if (err) {
            return res.status(500).send('Lỗi khi lấy chi tiết sản phẩm');
        }
        if (product) {
            res.render('product_detail', { product });
        } else {
            res.status(404).send('Không tìm thấy sản phẩm');
        }
    });
};

module.exports = {
    getProductsByCategory,
    getProductDetail
};
