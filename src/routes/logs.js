const express = require("express");
//const {logged}=require('../helpers/auth')
const {isserver}= require('../helpers/permissions')
const LogsController = require("../Controllers/LogsController");

const routes = express.Router();

routes.post("/logget",isserver, LogsController.postallmine);
routes.post('/getonemine',isserver, LogsController.getonemine);
routes.post('/sendstate',isserver, LogsController.sendstate);
routes.post('/updateson',isserver, LogsController.getsonupdate);

// users.get('/getusergener', AppController.getgender);
// routes.get("/tokenstate",logged,AppController.tokenstate);
module.exports = routes;