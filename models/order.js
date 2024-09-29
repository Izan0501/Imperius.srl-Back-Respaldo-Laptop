const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    amount: Number,
    image: String,
});

module.exports = mongoose.model('Order', orderSchema);