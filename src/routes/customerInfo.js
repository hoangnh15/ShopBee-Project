const express = require('express');
const path = require('path');
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
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
        console.log(user);
        user = { "fullname": user.full_name, "phone_number": user.phone_number, "gender": user.gender, "dob_day": user.dob_day, "dob_month": user.dob_month, "dob_year": user.dob_year, "email": user.email };
        res.render('customerInfo', { user });
    });

});

router.post('/cap-nhat-thong-tin',userController.userUpdate);

module.exports = router;