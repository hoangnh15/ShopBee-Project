const express = require('express');
const path = require('path');

const router = express.Router();

const validCategories = ['dien-thoai', 'phu-kien', 'laptop'];
router.get('/mua-ban', (req, res) => {
    res.send('Trang mua bán');
});

router.get('/:category', (req, res) =>{
    const category = req.params.category;
    // Kiểm tra nếu category nằm trong mảng hợp lệ
    
        if (validCategories.includes(category)) {
            // Sử dụng chung template cho các danh mục hợp lệ
            console.log(category);
            res.render('category');
        } else {
            // Xử lý khác hoặc trả về lỗi 404 nếu không hợp lệ
            res.status(404).send('Page not found');
        }
    
    
    
} );

router.get('/:category/:product', (req, res) => {
    const category = req.params.category;
    const product = req.params.product;

    // Kiểm tra nếu category nằm trong mảng hợp lệ
    if (validCategories.includes(category)) {
        // Bạn có thể thực hiện xử lý thêm với `category` và `product` ở đây
        console.log(`Category: ${category}, Product: ${product}`);

        // Sử dụng chung template cho các danh mục hợp lệ
        res.sendFile(path.join(__dirname, '/../view/show_detail_danhmuc.html'));
    } else {
        // Xử lý khác hoặc trả về lỗi 404 nếu không hợp lệ
        res.status(404).send('Page not found');
    }
});

module.exports = router;