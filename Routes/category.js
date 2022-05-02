const express=require("express");
const route=express.Router();
const controller=require("../controllers/category");
;
route.get('/',controller.getAll);
route.get('/:id',controller.getById);
route.put('/:id',controller.updateCategory);
route.post('/',controller.addCategory);
route.delete('/:id',controller.deleteCategory);


module.exports=route;