const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String,
    image: String,
});

module.exports = mongoose.model('Product', productSchema);