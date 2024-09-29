const Product = require('../models/product');
const Order = require('../models/order.js')
const image = require('../utils/getFileName.js');

//CRUD
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
};


async function getProduct(req, res) {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ msg: `Error To Get Product: ${error}` });
    }
};

async function getSpecificProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ msg: `Error To Get Product: ${error}` });
    }
};

async function updateProduct(req, res) {
    const { id } = req.params;
    const productData = req.body;

    if (req.files.image) {
        const imagePath = image.getFileName(req.files.image);
        productData.image = imagePath
    };

    res.status(200).send(productData);

    try {
        await Product.findByIdAndUpdate({ _id: id }, productData);
    } catch (error) {
        res.status(400).send({ msg: `Update Error: ${error}` })
    }
};

async function deleteProduct(req, res) {
    const { id } = req.params;
    
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).send({ msg: 'Deleted' })
    } catch (error) {
        res.status(400).send({ msg: `Delete Error: ${error}` });
    }
}

async function createOrder(req, res) {
    const newOrder = new Order(req.body);

    if (req.files.image) {
        const imagePath = image.getFileName(req.files.image);
        newOrder.image = imagePath
    }

    try {
        await newOrder.save()
        res.status(200).send({ msg: 'Saved Order' })
    } catch (error) {
        res.status(500).send({ msg: `Error To Save Product ${error}` });
    }
}

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getSpecificProduct,
    createOrder,
}