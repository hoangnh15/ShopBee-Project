const express = require('express');
const path = require('path');
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const addressController = require('../controllers/addressController');
const addressModel = require('../models/addressModel');
const router = express.Router();

router.get('/thong-tin-ca-nhan', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).send('User not logged in');
    }
    userModel.getUser(userId, (err, user) => {
        if (err) {
            return res.status(500).send('Error fetching user information');
        }
        user = { "fullname": user.full_name, "phone_number": user.phone_number, "gender": user.gender, "dob_day": user.dob_day, "dob_month": user.dob_month, "dob_year": user.dob_year, "email": user.email };
        res.render('customerInfo', { user });
    });

});

router.post('/cap-nhat-thong-tin',userController.userUpdate);


//address


router.post('/chinh-sua-dia-chi',addressController.updateAddress);
router.get('/quan-ly-dia-chi',(req, res) => {
    const userId = req.session.userId;
    const user = {"fullname": req.session.fullname};
    if(!userId){
        //return res.status(401).send('User not logged in');
        return res.render('index');
    }
    addressModel.addressGetByUser(userId,(err,addresses) => {
        if (err) {
            return res.status(500).send('Error fetching user information');
        }
        addresses.sort((a, b) => {
            if (a.isDefault === 1 && b.isDefault === 0) {
                return -1;
            } else if (a.isDefault === 0 && b.isDefault === 1) {
                return 1;
            } else {
                return 0;
            }
        });
    

        res.render('addressManagement', {user, addresses});
    });
    
} );

router.post('/them-dia-chi',addressController.insertAddress);

module.exports = router;