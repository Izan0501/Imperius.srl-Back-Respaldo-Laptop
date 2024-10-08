const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String,
    image: String,
    amount: Number,
});

module.exports = mongoose.model('Product', productSchema);