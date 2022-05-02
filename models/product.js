const category=require('./category');
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema=new schema({
    categoryId: {
        type:mongoose.Schema.Types.ObjectId ,
        ref: 'category',
    },
    name: {
        type: String,
        minlength:2,
    },
    price: {
        type: Number,
        required:true
    },
    desc: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
},
{timestamps:true})

module.exports=mongoose.model('product',productSchema);