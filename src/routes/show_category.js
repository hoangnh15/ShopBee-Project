const express = require('express');
const productController = require('../controllers/productController');  // Import controller

const router = express.Router();

const validCategories = ['dien-thoai', 'phu-kien', 'laptop'];

router.get('/mua-ban', (req, res) => {
    res.send('Trang mua bán');
});

// Lấy sản phẩm theo danh mục
router.get('/:category', productController.getProductsByCategory);

// Lấy chi tiết sản phẩm
router.get('/:category/:product', productController.getProductDetail);

module.exports = router;
