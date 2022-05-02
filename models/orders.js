const user=require('./user');
const product=require('./product')
const mongoose = require("mongoose");
const schema = mongoose.Schema;


const orderItemSchema=new schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:'product',
    },
    quantity:{
        type:Number,
        required:true
    }
})

const orderSchema=new schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId ,
        ref: 'Users'
    },
    date: {
        type: Date
        //default:new Date(),
    },
    amount: {
        type: Number,
        required:true
    },
    products: [orderItemSchema]
},
{timestamps:true})




module.exports=mongoose.model('order',orderSchema);