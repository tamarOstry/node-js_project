const mongoose = require("mongoose");
const schema = mongoose.Schema;
const {isEmail}= require('validator')

const addressSchema=new schema({
    city: {

        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    bilding: {
        type: Number,
        required: true,
        min: 1
    }
})

const userScema = new schema({  
    firstName: {
        type: String,
        minlength: 2
    },
    lastName: {
        type: String,
        minlength: 2
    },
    email: {
        type: String,
        unique:true,
        validate:[isEmail,'please insert valid']
    },
    password: {
        type: String,
        minlength: 8
    },
    address: [addressSchema],
    lastVisit: {
        type: Date,
        default:new Date()
    }
},
{timestamps:true})

userScema.virtual('orders',{
    ref:'order',
    localField:'_id',
    foreignField:'userId'
})
userScema.set('toJSON',{virtuals:true});


module.exports=mongoose.model('Users',userScema);