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

exports.deleteAddress = (req, res) =>{
    const user_id = parseInt(req.session.userId) ;
    const address_id = parseInt(req.params.id);
    if(!req.session.userId) {
        return res.status(400).json({message:"Bạn chưa đăng nhập!!"});
    }
    else {
        addressModel.addressGetByUser(user_id,(err, results)=>{
            if (err) {
                return res.status(500).json({message:`Database error ${err}`});
            }
            var isMatch =  (results.find(addr => addr.user_id === user_id && addr.address_id === address_id)) ? true : false;
            if(!isMatch){
                return res.status(400).json({message:"Hành động không hợp lệ!"});

            }
            addressModel.deleteAddress(address_id,(err, results)=>{
                if (err) {
                    return res.status(500).json({message:`Database error ${err}`});
                }
                res.status(200).json({message:"Đã xóa địa chỉ!"});
            });
            
        });
    }
};