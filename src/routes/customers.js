const express = require("express");
const CustomerController = require("../Controllers/CustomerController");
const { logged } = require("../helpers/auth");
const { isadmin } = require("../helpers/permissions");
const routes = express.Router();

//routes.get("/listbranches/:allclients/:numperpage/:pagination/:findlike",logged,isadmin,BranchesController.list);
// routes.get("/listbranches/:allclients/:numperpage/:pagination/",logged,isadmin,BranchesController.list);
routes.get("/findcustomer", CustomerController.find);
routes.get("/listages", CustomerController.listages);
routes.post("/editcustomer", CustomerController.edit);
routes.post("/newcustomer", CustomerController.new);
routes.get("/filterbycustomer", CustomerController.findby);
routes.get("/gendercustomer", CustomerController.gendercustomer);

module.exports = routes;
