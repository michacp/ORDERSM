const express = require("express");
const CustomerController=require ("../Controllers/CustomerController")
const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')
const routes = express.Router();


 //routes.get("/listbranches/:allclients/:numperpage/:pagination/:findlike",logged,isadmin,BranchesController.list);
// routes.get("/listbranches/:allclients/:numperpage/:pagination/",logged,isadmin,BranchesController.list);
 routes.get("/findcustomer",logged,isadmin,CustomerController.find);
 routes.get("/listages",logged,isadmin,CustomerController.listages);
  routes.post("/editcustomer",logged,isadmin,CustomerController.edit);
  routes.post("/newcustomer",logged,isadmin,CustomerController.new);
  routes.get("/filterbycustomer" ,logged,isadmin,CustomerController.findby );
//  routes.get("/deletebranches/:id",logged,isadmin, BranchesController.delete);


module.exports = routes;