const express=require("express");
const route=express.Router();
const controller=require("../controllers/order");

route.get('/',controller.getAll);
route.get('/:id',controller.getById);
route.put('/:id',controller.updateOrder);
route.post('/',controller.addorder);
route.delete('/:id',controller.deleteOrder);

module.exports=route;