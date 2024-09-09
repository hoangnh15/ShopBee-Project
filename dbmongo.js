const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    origin: String,
    year: Number,
    warranty_period: Number,
    size: String,
    weight: Number,
    material: String,
    status: String,
});

module.exports = mongoose.model('Product', productSchema);