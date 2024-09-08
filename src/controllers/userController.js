const userModel = require('../models/userModel');

exports.userUpdate = (req, res) => {
    const userData = req.body;

    userModel.updateUserInfomation(req.session.userId, userData, (err,results)=>{
        if(err){
            return res.status(500).json({message:`Database error ${err}`});

        }
        res.status(201).json({ message: 'Update Infomation successful' });
    });
    

};

