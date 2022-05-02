const {ObjectId}=require("mongodb");
const db=require("../DB/db");

exports.getAll=async function getAll(req,res){
    const product=await db.getDB().collection('Product').find().toArray();
    res.send(product);
}

exports.getById=async function getById(req,res){
    const id=req.params.id;
    const product=await db.getDB().collection('Product').findOne({_id:ObjectId(id)});
    res.send(product);
}

exports.addProduct=async function(req,res){
    if(req.body){
        const myProduct=req.body;
        const {name,category}=myProduct;
        const document={name:myProduct.name,category:myProduct.category};
        const product=await db.getDB().collection('Product').insertOne(document);
        res.send(product);
    }
}

exports.updateProduct=async function(req,res){
    if(req.body){
        const id=req.params.id;
        const myProduct=req.body;
        const {name,category}=myProduct;
        const document={name:myProduct.name,category:myProduct.category};

        const product=await db.getDB().collection('Product').updateOne({_id:ObjectId(id)},
        {
            $set:{
                name:document.name,
                category:document.category,
            }
        });
        res.send(product);
    }
};

exports.deleteProduct=async function(req,res){
    const product=await db.getDB().collection('Product').deleteOne({_id:ObjectId(req.params.id)});
    res.send("deleted");
}



