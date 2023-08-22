const OrdersController = {};
var crypto = require("crypto");
const OrderModel = require("../models/Order");
const modelpri = require("../modelsdb/order_types");
const modelstateorders = require("../modelsdb/state_orders");
const { newId } = require("../config/objectId");

OrdersController.new = async (req, res) => {
 // 
  try{
    req.body.imei=await req.body.imei.map(function(num) {
      return {imei:num.value};
  });
  req.body.contacts=await  Promise.all(req.body.contacts.map(async function(num) {
    return {_id:await newId(),contact_order:num.value};
}))
//console.log(req.body.contacts)
    const servers = await OrderModel.new(req.body,req.toke.dats);
    if(servers){
      if (servers.statusdup) {
        res.statusMessage = servers.mensage;
        res.sendStatus(304)
      } else {
      res.statusMessage = "ORDEN GUARDADA";
      res.sendStatus(200);}
    }else{
      res.statusMessage = "ORDEN NO GUARDADA";
      res.sendStatus(304)
    }
   // res.json(servers);
  }catch(err){
    res.statusMessage = "ORDEN NO GUARDADA";
    res.sendStatus(304)
//console.log(err)
  }
 // console.log(req.body.imei);

};
OrdersController.getbrands = async (req, res) => {
//    data=[
//     {state_imei:'active'},
//     {state_imei:'change'},
//     {state_imei:'migrated'},

//   ]
  

//  await model_stateimeis.insertMany(data)
 
  //const data=await aux.convert(req.body)
  //
  const servers = await OrderModel.listbrands();
  //console.log(servers)
  res.json(servers);
};
OrdersController.getmodels = async (req, res) => {
  // console.log(req.query)
  //const data=await aux.convert(req.body)
  //
  const servers = await OrderModel.listmodels(req.query._id);
  //console.log(servers)
  res.json(servers);
};
OrdersController.getcauses= async (req, res) => {
  // console.log(req.query)
  //const data=await aux.convert(req.body)
  //
  const servers = await OrderModel.listcauses(req.query._id);
  //console.log(servers)
  res.json(servers);
};
OrdersController.getpriority = async (req, res) => {
  const servers = await OrderModel.listpriority();
  res.json(servers);
};
OrdersController.gettypeorder = async (req, res) => {
  const servers = await OrderModel.listtypeorder();
  res.json(servers);
};
OrdersController.getnumberorder = async (req, res) => {
  const servers = await OrderModel.numberorder();
  res.json(servers);
};

OrdersController.getneworderdats = async (req, res) => {

  const numberorder = await OrderModel.numberorder(req.toke.dats.id);
  const typeorder = await OrderModel.listtypeorder();
  const priorityorder = await OrderModel.listpriority();
  const brandorder = await OrderModel.listbrands();
  const issuetype=await OrderModel.listissuetype()
  const reasons=await OrderModel.listreasons()
  res.json({numberorder,typeorder,priorityorder,brandorder,issuetype,reasons})
}

module.exports = OrdersController;

// data={
//   name:"repair"
// }
// const insertar = await modelpriority.create(data);
