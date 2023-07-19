const LogsController = {};
const logsdpip=require ("../models/Logs")

LogsController.postallmine = async (req, res) => {
    // console.log(req.body)
    //const data=await aux.convert(req.body)
     //
     const servers = await logsdpip.servers_state_log_logID(req.body);
     console.log(servers)
     res.json({servers:true});
   };
module.exports = LogsController;