const addressModel = require('../models/addressModel');

exports.insertAddress = (req, res) => {
    const body = req.body;
    body.isDefault = (body.isDefault) ? (body.isDefault = 1) : 0 ;
    const userData = {
        fullname: body.fullname,
        phone_number: body.phone_number,
        province: body.province,
        district: body.district,
        ward: body.ward,
        detail_addr: body.detail_addr,
        type: body.type,
        isDefault: body.isDefault
    };
    addressModel.insertAddress(req.session.userId, userData, (err,results)=>{
        if(err){
            return res.status(500).json({message:`Database error ${err}`});

        }
        if(results.message){
            return res.status(400).json({message:"Thông tin địa chỉ bị trùng lặp!!"});
        }
        res.status(201).json({ message: 'Added Infomation successful' });
    });
};

exports.updateAddress = (req, res) => {
    const body = req.body;
    console.log("test",body);
    if(!req.session.userId){
        return res.status(400).json({message:"Bạn chưa đăng nhập!!"});
    }
    if(parseInt(body.user_id) !==parseInt(req.session.userId)  ){
        return res.status(400).json({message:"Hành động không được phép!"});
    }
    body.isDefault = (body.isDefault) ? (body.isDefault = 1) : 0 ;
    const userData = {
        fullname: body.fullname,
        phone_number: body.phone_number,
        province: body.province,
        district: body.district,
        ward: body.ward,
        detail_addr: body.detail_addr,
        type: body.type,
        isDefault: body.isDefault
    }
    addressModel.updateAddress(body.address_id,userData,(err,results)=>{
        if(err){
            return res.status(500).json({message:`Database error ${err}`});

        }
        res.status(201).json({ message: 'Update Infomation successful' });

    });

    
};