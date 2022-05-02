const express=require("express");
const route=express.Router();
const controller=require("../controllers/product");

route.get('/',controller.getAll);
route.get('/:categoryId',controller.getProductByCategoryId);
route.put('/:id',controller.updateProduct);
route.post('/',controller.addProduct);
route.delete('/:id',controller.deleteProduct);

module.exports=route;