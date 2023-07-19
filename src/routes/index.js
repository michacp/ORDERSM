const express = require("express");
const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')
const AppController = require("../Controllers/AppController");

const routes = express.Router();

routes.get("/", AppController.index);
routes.post('/login', AppController.login);
// users.get('/getusergroup', AppController.usergroup);
// users.get('/getusergener', AppController.getgender);
// routes.get("/tokenstate",logged,AppController.tokenstate);
module.exports = routes;