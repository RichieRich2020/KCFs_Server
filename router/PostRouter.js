const express = require('express');

const authenticate = require('../middleware/Authentication');
const {
  getdata,
  getdatacategories,
  getcartdata,
  addcart,
  deletfromcart,
} = require('../controller/PostController');
const postrouter = express.Router();

postrouter.get('/', getdata);

postrouter.get('/categories', getdatacategories);

postrouter.get('/addtocart', authenticate, getcartdata);

postrouter.post('/addtocart', authenticate, addcart);

postrouter.delete('/addtocartdelete/:id', authenticate, deletfromcart);

module.exports = postrouter;
