const express = require("express");
const {logged}=require('../helpers/auth')
const {iscashier}= require('../helpers/permissions')
const OrdersController = require("../Controllers/OrdersController");

const routes = express.Router();

routes.post("/newrorder",logged, OrdersController.new);//logged,iscashier
routes.get('/getbrand',logged, OrdersController.getbrands);
routes.get('/getmodel',logged, OrdersController.getmodels);
routes.get('/getcauses',logged, OrdersController.getcauses);
routes.get('/getpriority',logged,  OrdersController.getpriority);
routes.get('/getotdertype', logged, OrdersController.gettypeorder);
routes.get('/getotdernumber', logged, OrdersController.getnumberorder);
routes.get('/getnerworderdats',logged,  OrdersController.getneworderdats);
routes.get('/listorders',logged,  OrdersController.listorders);
// routes.get("/tokenstate",logged,AppController.tokenstate);
module.exports = routes;