const LogsController = {};
const logsdpip = require("../models/Logs");

LogsController.postallmine = async (req, res) => {
  // console.log(req.body)
  //const data=await aux.convert(req.body)
  //
  const servers = await logsdpip.servers_state_log_logID(req.body);
  //console.log(servers)
  res.json(servers);
};
LogsController.getonemine = async (req, res) => {
 // console.log(req.body)
  //const data=await aux.convert(req.body)
  //
 const servers = await logsdpip.getonemine(req.body);
 // console.log(servers)
  res.json( servers);
};
LogsController.getallpertable = async (req, res) => {
  const servers = await logsdpip.getallpertable(req.body);
   res.json( servers);
 };
LogsController.sendstate= async (req, res) => {
 // console.log(req.body)
   //const data=await aux.convert(req.body)
   //
const servers = await logsdpip.savestate(req.body);
  // console.log(servers)
   res.json( servers);
 };
 
 LogsController.getsonupdate= async (req, res) => {
 // console.log(req.body)
   //const data=await aux.convert(req.body)
   //
  const result =await logsdpip.savedatason(req.body)
//const servers = await logsdpip.savestate(req.body);
 // console.log(result)
   res.json( result);
 };

module.exports = LogsController;
