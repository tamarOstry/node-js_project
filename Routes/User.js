const express=require('express');
const route=express.Router();
//const controller=require('../mongoControllers/User');
const controller=require('../controllers/user');

route.get('/',controller.getAll);
route.get('/:email/:password',controller.getById);
route.put('/:id',controller.updateUser);
route.post('/',controller.addUser);
route.delete('/:id',controller.deleteUser);
route.get('/:id',controller.userOrder);

module.exports=route;