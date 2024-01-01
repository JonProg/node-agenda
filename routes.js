const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')

//route home
route.get('/',homeController.index);

//routes login
route.get('/login',loginController.index);

module.exports = route;