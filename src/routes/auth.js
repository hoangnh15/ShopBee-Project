const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControler');

// Định nghĩa route cho login
router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/register', authController.register);

router.get('/status', (req, res)=>{
    if(req.session && req.session.userId){
        res.status(200).json({
            logggedIn: true,
            username: req.session.username
        });
    } else{
        res.status(200).json({
            logggedIn: false,
            username: req.session
        });
    }
});

module.exports = router;
