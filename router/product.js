const express = require('express');

const ProductController = require('../controllers/product');

const api = express.Router();

const multiparty = require('connect-multiparty');
const md_upload = multiparty({ uploadDir: './uploads/product' })

api.post('/product', [md_upload], ProductController.createProduct);

module.exports = api;