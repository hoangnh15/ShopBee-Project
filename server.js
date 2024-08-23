const express = require('express');

const path = require('path');

const app = express();

const route_danhmuc = require('./route/show_danhmuc');

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'/view/index.html'));
} );
// use boostrap
app.use('/images', express.static(path.join(__dirname, 'view/images')));
app.use('/css', express.static(path.join(__dirname, 'view/css')));
app.use('/js', express.static(path.join(__dirname, 'view/js')));
app.use('/assets', express.static(path.join(__dirname, 'view/assets')));
app.use('/custom', express.static(path.join(__dirname, 'view/custom')));

app.use('/', route_danhmuc);


app.listen(3000, () => {
    console.log('Server is running at PORT 3000');
});