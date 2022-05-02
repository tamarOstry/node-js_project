const express = require('express');
const app = express();
const user = require('./Routes/User');
const product = require('./Routes/Product');
const category = require('./Routes/category');
const orders = require('./Routes/orders');
const db = require("./DB/dbMongoose");
const logger = require('./log/logger');
require('dotenv').config();
const path=require('path')
const port = process.env.PORT;

db.connect();
app.use(express.static('static'));
app.use(express.json());
app.use('/user', user);
app.use('/products', product);
app.use('/category', category);
app.use('/orders', orders);

console.log('I love you!!')
app.use((req,res)=>{
  res.status(404).sendFile(path.join(__dirname,'./static/HTML/404.html'));
})

app.use((err, req, res, next) => {
    logger.error(err.message)
    res.status(500).send('something faild')
})


app.listen(port, () => {
    logger.info(`the server go on ${port}`);
})