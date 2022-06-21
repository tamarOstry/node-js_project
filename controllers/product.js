const productModel = require('../models/product');
const { ObjectId } = require('mongodb');

exports.getAll = async function (req, res,next) {
    try {
        const products = await productModel.find();
        res.send(products);
    }
    catch (error) {
        next(error);
    }
}

exports.getProductByCategoryId = async function (req, res,next) {
    try {
        const products = await productModel.find({'categoryId': req.params.categoryId});
        res.send(products);
    }
    catch (error) {
        next(error);
    }
}

exports.addProduct = async function (req, res,next) {
    try {
        const product = new productModel(req.body);
        const inserted = await product.save();
        res.send(inserted);
    }
    catch (error) {
        next(error);    }
}

exports.updateProduct = async function (req, res,next) {
    if (req.body) {
        try {
            const id = ObjectId(req.params.id);
            const { categoryId, name, price, desc, imageUrl } = req.body;
            const data = {
                categoryId: categoryId,
                name: name,
                price: price,
                desc: desc,
                imageUrl: imageUrl
            }
            const updateProduct = await productModel.findByIdAndUpdate(id, data, {
                new: true
            });
            res.send(updateProduct);
        }
        catch (error) {
            next(error);        }
    }

}

exports.deleteProduct = async function (req, res,next) {
    try {
        const id = ObjectId(req.params.id);
        const productToDelete = await productModel.deleteOne(id);
        res.send(`removed`);
    }
    catch (error) {
        next(error);    }
}