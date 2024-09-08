const userModel = require('../models/userModel');

exports.login = (req, res) => {
    const { username, password } = req.body;

    userModel.findUserByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Không tìm thấy người dùng!!' });
        }

        // So sánh mật khẩu trực tiếp
        if (password !== user.password) {
            return res.status(401).json({ message: 'Sai mật khẩu đăng nhập !!!' });
        }

        // Lưu thông tin người dùng vào session
        console.log(user);
        req.session.userId = user.user_id;
        req.session.username = user.username;
        req.session.fullname = user.full_name;
        console.log(`User ${username} login`);
        res.status(200).json({ message: 'Login successful'});
    });
};

exports.logout = (req, res) => {
    // Hủy session của người dùng
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout' });
        }

        // Xóa cookie session
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
};

exports.register = (req, res) => {
    const { full_name, username, email, password, repeat_password } = req.body;
    // Kiểm tra dữ liệu đầu vào
    if (!full_name || !username || !email || !password || !repeat_password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== repeat_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    userModel.createUser(full_name, username, email, password, (err, results) =>{
        if(err){
            return res.status(500).json({message:`Database error ${err}`});

        }
        req.session.userId = results.insertId;
        req.session.username = username;
        res.status(201).json({ message: 'Registration successful' });
    });
};