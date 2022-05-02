const categoryModel = require('../models/category');
const { ObjectId } = require('mongodb');
const { ExceptionHandler } = require('winston');

exports.getAll = async function (req, res,next) {
    try {
        const categories = await categoryModel.find();
        res.send(categories);
    }
    catch (error) {
        next(error);
    }
}

exports.getById = async function (req, res,next) {
    try {
        const category = await categoryModel.findOne({_id:ObjectId(req.params.id)});
        res.send(`hello to${category}`);
    }
    catch (error) {
        next(error);
    }
}

exports.addCategory = async function (req, res,next) {
    try {
        const category = new categoryModel(req.body);
        const inserted = await category.save();
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
}

exports.updateCategory = async function (req, res,next) {
    if(req.body){
        try {
            const id = ObjectId(req.params.id);
            const {name} = req.body;
            const data={
                name:name
            }
            const updateCategory = await categoryModel.findByIdAndUpdate(id,data,{
                new:true
            });
            res.send(`${updateCategory}`);
        }
        catch (error) {
            next(error);
        }
    }
    
}

exports.deleteCategory = async function (req, res,next) {
    try {
        const id = ObjectId(req.params.id);
        const categoryToDelete = await categoryModel.deleteOne(id);
        res.send(`removed`);
    }
    catch (error) {
        next(error);
    }
}
