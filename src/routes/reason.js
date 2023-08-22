const express = require("express");
//const {logged}=require('../helpers/auth')
const {isserver}= require('../helpers/permissions')
const ReasonController = require("../Controllers/ReasonController");

const routes = express.Router();

routes.post("/newreason", ReasonController.new);
//routes.post('/getonemine',isserver, LogsController.getonemine);
// users.get('/getusergroup', AppController.usergroup);
// users.get('/getusergener', AppController.getgender);
// routes.get("/tokenstate",logged,AppController.tokenstate);
module.exports = routes;