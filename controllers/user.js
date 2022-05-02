const userModel = require('../models/user');
const { ObjectId } = require('mongodb');
const logger = require('../log/logger');
require('dotenv').config();
const dev = process.env.ENVIROMENT;

exports.getAll = async function (req, res,next) {
    try {
        const users = await userModel.find();
        res.send(users);
    }
    catch (error) {
        next(error);    }
}

exports.getById = async function (req, res,next) {
    try {
        const user = await userModel.findOne({ email: req.params.email, password: req.params.password });
        res.send(user);
    }
    catch (error) {
        next(error);    }
}

exports.addUser = async function (req, res,next) {
    try {
        const user = new userModel(req.body);
        const inserted = await user.save();
        res.send(inserted);
    }
    catch (error) {
        next(error);    }
}

exports.updateUser = async function (req, res,next) {
    if(req.body){
        try {
            const id = ObjectId(req.params.id);
            const {firstName,lastName,email,password,address} = req.body;
            const data={
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
                address:address
            }
            if(dev=='development')
               logger.info('before find By Id And Update')
            const updateUser = await userModel.findByIdAndUpdate(id,data,{new:true});   
            if(dev=='development')
               logger.info('after find By Id And Update')
            res.send(updateUser);
        }
        catch (error) {
            next(error);        }
    } 
}

exports.deleteUser = async function (req, res ,next) {
    try {
        const id = ObjectId(req.params.id);
        const userToDelete = await userModel.deleteOne(id);
        res.send(`removed`);
    }
    catch (error) {
        next(error);    }
}

exports.userOrder=async function(req,res,next){
    try{
        const userId=req.params.id;
        const order=await userModel.findOne({_id:ObjectId(userId)}).populate({path:'orders',select:'date amount products'})
        res.send(order);
    }
    catch(err){
        next(err);
    }
}

