const express = require('express');
const path = require('path');
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const addressController = require('../controllers/addressController');
const addressModel = require('../models/addressModel');
const productController = require('../controllers/admin-productController');
const productModel = require('../models/productModel');
const brandModel = require('../models/brandModel');
const categoryModel = require('../models/categoryModel');
const router = express.Router();

router.get('/admin-product', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).send('User not logged in');
    }
    var brand ="";
    var categories ="";
    brandModel.GetBrand((err,results) =>{
        if (err) {
            return res.status(500).send('Error fetching information');
        }
        brand = results;
        
    });
    categoryModel.GetCategory((err,results) =>{
        if (err) {
            return res.status(500).send('Error fetching information');
        }
        categories = results;
        
    });
    productModel.GetAllProduct(userId,(err,results)=>{
        if (err) {
            return res.status(500).send('Error fetching information');
        }
        const products = results;
        //console.log(JSON.stringify(results, null, 2));
        res.render('admin_product',{products:JSON.stringify(results, null, 2), brands: JSON.stringify(brand), categories: JSON.stringify(categories)});
    });
    

});

router.get('/admin/GetProduct',productController.GetAllProduct);
module.exports = router;