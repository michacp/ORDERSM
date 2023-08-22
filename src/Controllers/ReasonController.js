const LogsController = {};
const logsdpip = require("../models/Reason");

LogsController.new = async (req, res) => {
  // console.log(req.body)
  //const data=await aux.convert(req.body)
  //
  const servers = await logsdpip.new(req.body);
  //console.log(servers)
  res.json(servers);
};

module.exports = LogsController;