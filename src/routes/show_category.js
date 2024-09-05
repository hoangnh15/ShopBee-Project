const express = require('express');
const path = require('path');

const router = express.Router();

const validCategories = ['dien-thoai', 'phu-kien', 'laptop'];
router.get('/mua-ban', (req, res) => {
    res.send('Trang mua bán');
});
const products = [
    {
        name: 'Samsung Galaxy M55 5G 256GB',
        originalPrice: '11.690.000',
        discountPercent: 9,
        salePrice: '10.690.000',
        imageUrl: 'https://via.placeholder.com/220x220'
    },
    {
        name: 'iPhone 13 Pro Max 128GB',
        originalPrice: '32.990.000',
        discountPercent: 5,
        salePrice: '31.340.000',
        imageUrl: 'https://via.placeholder.com/220x220'
    },
    {
        name: 'Xiaomi Redmi Note 11 128GB',
        originalPrice: '5.990.000',
        discountPercent: 10,
        salePrice: '5.390.000',
        imageUrl: 'https://via.placeholder.com/220x220'
    },
    {
        name: 'Oppo Reno6 Z 5G 128GB',
        originalPrice: '9.490.000',
        discountPercent: 8,
        salePrice: '8.690.000',
        imageUrl: 'https://via.placeholder.com/220x220'
    },
    {
        name: 'Sony Xperia 1 III 256GB',
        originalPrice: '25.990.000',
        discountPercent: 12,
        salePrice: '22.870.000',
        imageUrl: 'https://via.placeholder.com/220x220'
    },
    {
        name: 'Vivo V21 5G 128GB',
        originalPrice: '7.990.000',
        discountPercent: 15,
        salePrice: '6.790.000',
        imageUrl: 'https://via.placeholder.com/220x220'
    },
    {
        name: 'Realme GT Neo2 5G 128GB',
        originalPrice: '10.990.000',
        discountPercent: 7,
        salePrice: '10.220.000',
        imageUrl: 'https://via.placeholder.com/220x220'
    },
    {
        name: 'OnePlus 9 Pro 256GB',
        originalPrice: '23.990.000',
        discountPercent: 10,
        salePrice: '21.590.000',
        imageUrl: 'https://via.placeholder.com/220x220'
    }
    
];

router.get('/:category', (req, res) =>{
    const category = req.params.category;
    // Kiểm tra nếu category nằm trong mảng hợp lệ
        //querrydb
        if (validCategories.includes(category)) {
            // Sử dụng chung template cho các danh mục hợp lệ
            console.log(category);
            res.render('category',{products});
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