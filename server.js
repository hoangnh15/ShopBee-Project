const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//CORS:
app.use(cors());




// Thiết lập EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
// cookie session config
const sessionConfig = require('./config/session');
app.use(cookieParser());
app.use(session(sessionConfig));
// Static files: Phục vụ tất cả các tệp tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

const connection = require('./config/database');

app.get('/', (req, res) => {
    res.render('index');
});
// use route:
const route_category = require('./src/routes/show_category');
const authRoutes = require('./src/routes/auth');
const custom_info = require('./src/routes/customerInfo');
const admin_product = require('./src/routes/admin_product');
app.use('/', admin_product);
app.use('/auth', authRoutes);
app.use('/',custom_info);
app.use('/', route_category);
app.listen(3000, () => {
    console.log('Server is running at PORT 3000');
});