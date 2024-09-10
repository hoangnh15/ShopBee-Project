const productModel = require('../models/productModel');

exports.GetAllProduct = (req, res) => {
    const userId = req.session.userId;
    if(!req.session.userId){
        return res.status(400).json({message:"Bạn chưa đăng nhập!!"});
    }
    productModel.GetAllProduct(userId,(err, results)=>{
        if (err) {
            return res.status(500).json({message:"Database error"});
        }
        

          res.status(200).json(results);
    });
    
   
};