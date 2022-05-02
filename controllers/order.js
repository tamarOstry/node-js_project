const orderModel = require('../models/orders');
const { ObjectId } = require('mongodb');
const logger=require('../log/logger');

exports.getAll = async function (req, res,next) {
    try {
        const orders = await orderModel.find();
        logger.error();
        res.send(orders);
    }
    catch (error) {
        next(error);
    }
}

exports.getById = async function (req, res,next) {
    try {
        const order = await orderModel.findOne(ObjectId(req.params.id)).populate('userId').populate('products.productId');
        res.send(order);
    }
    catch (error) {
        next(error);
    } 
}

exports.addorder = async function (req, res,next) {
    try {
        const order = new orderModel(req.body);
        const inserted = await order.save();
        logger.error(inserted)
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
}

exports.updateOrder = async function (req, res,next) {
    if(req.body){
        try {
            const id = ObjectId(req.params.id);
            const {userId,date,amount,products} = req.body;
            const data={
                userId:userId,
                date:date,
                amount:amount,
                products:products,
            }
            const updateOrder = await orderModel.findByIdAndUpdate(id,data,{
                new:true
            });
            res.send(`${updateOrder}`);
        }
        catch (error) {
            next(error);
        }
    }
    
}

exports.deleteOrder = async function (req, res,next) {
    try {
        const id = ObjectId(req.params.id);
        const orderToDelete = await orderModel.deleteOne(id);
        res.send(`removed`);
    }
    catch (error) {
        next(error);
    }
}
