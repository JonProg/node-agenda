const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');

const {loginRequired} = require('./src/middlewares/middleware');

//route home
route.get('/',homeController.index);

//routes login
route.get('/login',loginController.index);
route.post('/login/register',loginController.register);
route.post('/login/logon',loginController.logon);
route.get('/login/logout',loginController.logout);

//routes contact
route.get('/contact',loginRequired,contactController.index);
route.post('/contact/create',loginRequired,contactController.create);

module.exports = route;