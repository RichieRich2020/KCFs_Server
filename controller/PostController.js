const express = require('express');
const jwt = require('jsonwebtoken');
const { MenuData } = require('../models/postDataModel');
const { mealscategories } = require('../models/MealsCategories');
const { CartData } = require('../models/cartmodel');

const authenticate = require('../middleware/Authentication');
const postrouter = express.Router();

const getdata = async (req, res) => {
  try {
    const { cate } = req.query;
    let obj = {};
    if (cate) {
      obj.cate = cate;
    }
    respones = await MenuData.find(obj);
    return res.send(respones);
  } catch (error) {
    console.log(error);
    return res.status(501).send('server went done');
  }
};

const getdatacategories = async (req, res) => {
  try {
    const { cate } = req.query;
    let obj = {};
    if (cate) {
      obj.cate = cate;
    }
    respones = await mealscategories.find();
    // console.log(respones, 'cate');
    return res.send(respones);
  } catch (error) {
    console.log(error);
    return res.status(501).send('server went done');
  }
};

const getcartdata = async (req, res) => {
  try {
    const userdata = req.userinfo;
    let data = req.body;
    respones = await CartData.find({ user_id: userdata._id });
    return res.send(respones);
  } catch (error) {
    console.log(error);
    return res.status(501).send('server went done');
  }
};
const addcart = async (req, res) => {
  try {
    let data = req.body;
    const userdata = req.userinfo;
    data = {
      user_id: userdata._id,
      ...data,
    };

    let present = await CartData.findOne({
      id: data.id,
      user_id: data.user_id,
    });
    let respones;
    if (present) {
      present.quantity = present.quantity + 1;
      respones = await CartData.findOneAndUpdate(
        {
          _id: present._id,
        },
        {
          ...present,
        }
      );
    } else {
      data.quantity = 1;
      respones = await CartData.create({
        ...data,
      });
    }
    let count = await CartData.find().count();

    return res.send({ data: respones, count: count });
  } catch (error) {
    console.log(error);
    return res.status(501).send('server went done');
  }
};

const deletfromcart = async (req, res) => {
  try {
    const _id = req.params.id;

    const respones = await CartData.findByIdAndDelete(_id);
    return res.send(respones);
  } catch (error) {
    console.log(error);
    return res.status(501).send('server went done');
  }
};

module.exports = {
  getdata,
  getdatacategories,
  getcartdata,
  addcart,
  deletfromcart,
};
