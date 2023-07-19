const express = require("express");
//const {logged}=require('../helpers/auth')
const {isserver}= require('../helpers/permissions')
const LogsController = require("../Controllers/LogsController");

const routes = express.Router();

routes.post("/logget",isserver, LogsController.postallmine);
//routes.post('/login', AppController.login);
// users.get('/getusergroup', AppController.usergroup);
// users.get('/getusergener', AppController.getgender);
// routes.get("/tokenstate",logged,AppController.tokenstate);
module.exports = routes;