const LogsModels = {};
const modellogs = require("../modelsdb/logs");
const modelserverstatelog = require("../modelsdb/servers_state_logs");
const modelserverstatelogslogs=require("../modelsdb/server_state_log_log")
const modelserver = require("../modelsdb/serverusers");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

LogsModels.log = async (id, table, action) => {
  try {
    dte = {
      table: table,
      action: action,
      id_origin: id,
      date: Date.now(),
    };
    const insertar = await modellogs.create(dte);
    LogsModels.servers_state_log_log(insertar._id,'64b6dbd7f270c2e21b255808')
    if (insertar === "error") {
      console.log("ERROR");

      return (insertar1 = false);
    } else {
      return (insertar1 = true);
    }
  } catch (e) {
    console.error(e);

    return (insertar1 = false);
  }
};
LogsModels.servers_state_log_log = async (id,state) => {
  try {
    const insertar = await modelserverstatelogslogs.insertMany(await groupjson(state, id));

    if (insertar === "error") {
      console.log("ERROR");

      return (insertar1 = false);
    } else {
      return (insertar1 = true);
    }
  } catch (e) {
    console.error(e);

    return (insertar1 = false);
  }
};
LogsModels.servers_state_log_logID = async (data) => {
  //console.log(data)
  try {
    const  myAggregate = await modelserverstatelogslogs.aggregate([
      {
        $match: {
          id_server: new ObjectId(data.idserver),
        },
      },
      {
        $lookup: {
          from: "logs",
          localField: "id_logs",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                table: 1,
                action: 1,
                date: 1,
                id_origin:1
              },
            },
          ],
          as: "logs",
        },
      },
      { $unwind: "$logs" },
      {
        $lookup: {
          from: "server_state_logs",
          localField: "server_state_log",
          foreignField: "_id",
          pipeline: [
            {
              $match: {
                name:'WAITING',
              },
            },
            {
              $project: {
                _id: 1,
                name:1
              },
            },
          ],
          as: "server_state_logs",
        },
      },
      { $unwind: "$server_state_logs" },
      {
        $project: {
          
          logs:1,
        },
      },
    ])
    if(myAggregate.length==0){
      return false
    }else{
      return myAggregate
    }
      
    
  } catch (error) {
  return false  
  }

}
async function groupjson(idstate, idlog) {
  let jsongroup = [];
  const servers =await getserver()
  
   for (i = 0; i < servers.length; i++) {
    jsongroup.push({id_server: servers[i]._id, server_state_log: idstate,id_logs:idlog});
   }
  return jsongroup;
}

async function getserver() {
  myAggregate = await modelserver.aggregate([

    {
      $lookup: {
        from: "states",
        localField: "state_server",
        foreignField: "_id",
        as: "state",
        pipeline: [
          {
            $match: {
              name: "ENABLE",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
        as: "state",
      },
    },
    { $unwind: "$state" },
    {
        $project: {
          _id: 1,
        },
      },
  ]);
  return myAggregate
}

module.exports = LogsModels;
