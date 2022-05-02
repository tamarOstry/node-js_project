const {ObjectId}=require("mongodb");
const db=require("../DB/db");

exports.getAll=async function getAll(req,res){
    const users=await db.getDB().collection('Users').find().toArray();
    res.send(users);
}

exports.getById=async function getById(req,res){
    const user=await db.getDB().collection('Users').findOne({email:req.body.email,password:req.body.password});
    res.send(user);
}

exports.addUser=async function(req,res){
    if(req.body){
        const myUser=req.body;
        const {id,name,email,password}=myUser;
        const document={id:myUser.id,name:myUser.name,email:myUser.email,password:myUser.password};
        const user=await db.getDB().collection('Users').insertOne(document);
        res.send(user);
    }
}

exports.updateUser=async function(req,res){
    if(req.body){
        const id=req.params.id;
        const myUser=req.body;
        const {name,email,password}=myUser;
        const document={name:myUser.name,email:myUser.email,password:myUser.password};

        const user=await db.getDB().collection('Users').updateOne({_id:ObjectId(id)},
        {
            $set:{
                name:document.name,
                email:document.email,
                password:document.password
            }
        });
        res.send("user update");
    }
};

exports.deleteUser=async function(req,res){
    const user=await db.getDB().collection('Users').deleteOne({_id:ObjectId(req.params.id)});
    res.send("deleted");
}



