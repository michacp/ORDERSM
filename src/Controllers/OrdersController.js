const OrdersController = {};
var crypto = require("crypto");
const OrderModel = require("../models/Order");
const modelpri = require("../modelsdb/order_types");
const modelstateorders = require("../modelsdb/state_orders");
const { newId } = require("../config/objectId");
const aux = require("../config/auxp");

OrdersController.new = async (req, res) => {
  try{
  try{
    req.body.imei=await req.body.imei.map(function(num) {
      return {imei:num.value};
  });

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
} catch (error) {
  res.sendStatus(417);
}

};
OrdersController.getbrands = async (req, res) => {
  try{
  const servers = await OrderModel.listbrands();
  //console.log(servers)
  res.json(servers);
} catch (error) {
  res.sendStatus(417);
}
};
OrdersController.getmodels = async (req, res) => {
  try{
  const servers = await OrderModel.listmodels(req.query._id);
  //console.log(servers)
  res.json(servers);
} catch (error) {
  res.sendStatus(417);
}
};
OrdersController.getcauses= async (req, res) => {
  try{

  const servers = await OrderModel.listcauses(req.query._id);
  res.json(servers);
} catch (error) {
  res.sendStatus(417);
}
};
OrdersController.getpriority = async (req, res) => {
  try{
  const servers = await OrderModel.listpriority();
  res.json(servers);
} catch (error) {
  res.sendStatus(417);
}
};
OrdersController.gettypeorder = async (req, res) => {
  try{
  const servers = await OrderModel.listtypeorder();
  res.json(servers);
} catch (error) {
  res.sendStatus(417);
}
};
OrdersController.getnumberorder = async (req, res) => {
  try{
  const servers = await OrderModel.numberorder();
  res.json(servers);
} catch (error) {
  res.sendStatus(417);
}
};

OrdersController.getneworderdats = async (req, res) => {
  try{
  const numberorder = await OrderModel.numberorder(req.toke.dats.id);
  const typeorder = await OrderModel.listtypeorder();
  const priorityorder = await OrderModel.listpriority();
  const brandorder = await OrderModel.listbrands();
  const issuetype=await OrderModel.listissuetype()
  const reasons=await OrderModel.listreasons()
  res.json({numberorder,typeorder,priorityorder,brandorder,issuetype,reasons})
} catch (error) {
  res.sendStatus(417);
}
}

OrdersController.listorders = async (req, res) => {
  try{
    const data = await aux.convert(req.query);
    const orders=await OrderModel.listorders(data)
    res.json(orders)
} catch (error) {
  res.sendStatus(417);
}
}


module.exports = OrdersController;

// data={
//   name:"repair"
// }
// const insertar = await modelpriority.create(data);
