const express = require('express');
const { user } = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const brcypt = require('bcryptjs');
const { Registeruser, loginuser } = require('../controller/RegisterController');
const registerrouter = express.Router();

registerrouter.get('/user', async (req, res) => {
  try {
    return res.send('registerUser');
  } catch (err) {
    console.log(err);
  }
});
registerrouter.post('/register', Registeruser);

registerrouter.post('/login', loginuser);

module.exports = registerrouter;
