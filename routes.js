const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

//route home
route.get('/',homeController.index);

//routes login
route.get('/login',loginController.index);
route.post('/login/register',loginController.register);

module.exports = route;