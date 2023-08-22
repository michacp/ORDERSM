const permissions = {};
const jwt = require("jsonwebtoken");
var fs = require("fs");
const findgroup=require("../models/UserModels")
const {key}=require('../config/key')
const server=require('../models/Serversh')
const bq = require('../helpers/bcryptjs')
permissions.isadmin =async (req, res, next) => {
 
    var cert = fs.readFileSync(key.public)//("./keys/jwtRS256.key.pub");
    //console.log("aqui")
    jwt.verify(req.token, cert,async (error, authData) => {
        if (error) {
            res.sendStatus(403);
          } else {
            const groups=await findgroup.findgroup(authData.dats,'ADMINS')
            //console.log(authData.dats)
            if(groups){
             
              next();
            }else{
               res.send({ status: false, result: "No tienes permiso" }) ;
            }
           // console.log()
            
            //res.json(authData)
            //const app = await App.get();
            //
          }
        });
    
//console.log(req)


}
permissions.iscashiers =async (req, res, next) => {
 
  var cert = fs.readFileSync(key.public)//("./keys/jwtRS256.key.pub");
  //console.log("aqui")
  jwt.verify(req.token, cert,async (error, authData) => {
      if (error) {
          res.sendStatus(403);
        } else {
          const groups=await findgroup.findgroup(authData.dats,'CASHIERS')
          //console.log(authData.dats)
          if(groups){
           
            next();
          }else{
             res.send({ status: false, result: "No tienes permiso" }) ;
          }
         // console.log()
          
          //res.json(authData)
          //const app = await App.get();
          //
        }
      });
  
//console.log(req)


}
permissions.isserver=async(req, res, next)=>{
  try {
    
    const insertar=await server.find(req.body.name_server)
    //console.log(insertar)
   if(insertar.lengt==0){
    res.sendStatus(403)
   }else{
    const pass = bq.verifyPassword(req.body.password_server, insertar[0].password_server)
    if(pass){
      req.body.idserver=insertar[0]._id
      next() 
    }else{
      res.sendStatus(403)
    }
   }

   
  } catch (error) {
    console.log(error)
    res.sendStatus(403)
  }

}
module.exports = permissions ;
