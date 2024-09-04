const Product = require('../models/product');
const image = require('../utils/getFileName');

async function createProduct(req, res) {
    const newProduct = new Product(req.body);

    if (req.files.image) {
        const imagePath = image.getFileName(req.files.image);
        newProduct.image = imagePath
    }

    try {
        await newProduct.save()
        res.status(200).send({ msg: 'Saved Product' })
    } catch (error) {
        res.status(500).send({ msg: `Error To Save Product ${error}` });
    }
}

module.exports = {
    createProduct,
}