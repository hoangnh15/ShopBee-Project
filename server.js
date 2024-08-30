const express = require('express');
const path = require('path');

const app = express();

// Thiết lập EJS làm view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

// Static files: Phục vụ tất cả các tệp tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

const route_danhmuc = require('./src/routes/show_danhmuc');
const db = require('./config/database');

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', route_danhmuc);

app.listen(3000, () => {
    console.log('Server is running at PORT 3000');
});