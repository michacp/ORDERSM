const LogsModels = {};
const modellogs = require("../modelsdb/logs");
const modelserverstatelog = require("../modelsdb/servers_state_logs");
const modelserverstatelogslogs = require("../modelsdb/server_state_log_log");
const modelserver = require("../modelsdb/serverusers");
const modelcustomer = require("../modelsdb/customers");
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
    LogsModels.servers_state_log_log(insertar._id);
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
LogsModels.servers_state_log_log = async (id) => {
  try {
    const insertar = await modelserverstatelogslogs.insertMany(
      await groupjson(id, false)
    );

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
  try {
    const myAggregate = await modelserverstatelogslogs.aggregate([
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
                id_origin: 1,
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
                name: "WAITING",
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: "server_state_logs",
        },
      },
      { $unwind: "$server_state_logs" },
      {
        $project: {
          logs: 1,
        },
      },
    ]);
    if (myAggregate.length == 0) {
      return false;
    } else {
      return myAggregate;
    }
  } catch (error) {
    return false;
  }
};
async function groupjson(idlog, idserver) {
  let jsongroup = [];
  const servers = await getserver();
  const serverstate = await modelserverstatelog.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
      },
    },
  ]);

  //console.log(serverstate)
  for (i = 0; i < servers.length; i++) {
    if (idserver) {
      if (servers[i]._id.toString() === idserver.toString()) {
        const statefind = serverstate.filter(
          (element) => element.name == "LOGGER"
        );
        jsongroup.push({
          id_server: servers[i]._id,
          server_state_log: statefind[0]._id,
          id_logs: idlog,
        });
        // console.log(servers[i]._id,idserver)
      } else {
        const statefind = serverstate.filter(
          (element) => element.name == "WAITING"
        );
        jsongroup.push({
          id_server: servers[i]._id,
          server_state_log: statefind[0]._id,
          id_logs: idlog,
        });
      }
    } else {
      const statefind = serverstate.filter(
        (element) => element.name == "WAITING"
      );
      jsongroup.push({
        id_server: servers[i]._id,
        server_state_log: statefind[0]._id,
        id_logs: idlog,
      });
    }
  }
  //console.log(jsongroup )
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
  return myAggregate;
}
LogsModels.gettableid = async (data) => {
  //console.log(data)
  try {
    const myAggregate = await mo.aggregate([
      {
        $match: {
          id_server: new ObjectId(data.idserver),
        },
      },
    ]);
    if (myAggregate.length == 0) {
      return false;
    } else {
      return myAggregate;
    }
  } catch (error) {
    return false;
  }
};
LogsModels.getonemine = async (data) => {
  try {
    const idsss = await data.ids.map(function (x) {
      return new ObjectId(x);
    });
    // console.log(idsss);
    const myAggregate = await modellogs.aggregate([
      {
        $match: {
          _id: { $in: idsss }, //new ObjectId(idsss[0])//{$in:idsss[0]},//new ObjectId(data.idlog)
        },
      },
      {
        $lookup: {
          from: data.table,
          localField: "id_origin",
          foreignField: "_id",

          as: "tabledata",
        },
      },
      { $unwind: "$tabledata" },
      {
        $project: {
          _id: 1,
          table: 1,
          action: 1,
          tabledata: 1,
        },
      },
    ]);
    // console.log(myAggregate);
    if (myAggregate.length == 0) {
      return false;
    } else {
      return myAggregate;
    }
  } catch (error) {
    return false;
  }
};
LogsModels.getallpertable = async (data) => {
  try {
    const getalltable = require("../modelsdb/"+ data.table);
    
    var myAggregate;
    var page = data.pagination;
    var numPerPage = data.numperpage;
    var skip = (page - 1) * numPerPage;

    myAggregate = await getalltable.aggregate([

      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { page: Number(page) } },
          ],
          data: [{ $skip: skip }, { $limit: numPerPage }], // add projection here wish you re-shape the docs
        },
      },
    ]);
    var numero_de_paginas;
    var total;
    if (myAggregate[0].metadata.length == 0) {
      numero_de_paginas = Math.trunc(0 / numPerPage) + 1;
      total = 0;
    } else {
      numero_de_paginas =
        Math.trunc(myAggregate[0].metadata[0].total / numPerPage) + 1;
      total = myAggregate[0].metadata[0].total;
    }

    const respuesta = {
      allclients: data.allclients,
      page_numbers: numero_de_paginas,
      actual_page: page,
      number_of_records: total,
      number_of_records_per_page: numPerPage,
      intake: myAggregate[0].data,
    };
    return respuesta;
  } catch (err) {
    console.log(err);
    return false;
  }
};

LogsModels.savestate = async (data) => {
  try {
    const serverstate = await modelserverstatelog.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);
    let datas = {
      notes: data.notes,
    };
    if (data.status) {
      const statefind = serverstate.filter((element) => element.name == "DONE");
      datas.server_state_log = new ObjectId(statefind[0]._id);
    } else {
      const statefind = serverstate.filter(
        (element) => element.name == "UNDONE"
      );
      datas.server_state_log = new ObjectId(statefind[0]._id);
    }
    // console.log(datas)
    await modelserverstatelogslogs.findOneAndUpdate(
      {
        id_logs: new ObjectId(data.log),
        id_server: new ObjectId(data.idserver),
      },
      { $set: datas },
      {
        returnOriginal: false,
      }
    );
    //  console.log(insertar);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
LogsModels.savedatason = async (data) => {
  // console.log(data)
  try {
    let resultstate = [];
    const savedata = require("../modelsdb/" + data.table);
    for (let i = 0; i < data[data.table].length; i++) {
      //console.log(data[data.table][i].action);
      try {
        var save = false;
        if (data[data.table][i].action == "create") {
          save = await savedata.create(data[data.table][i]);
        }
        if (data[data.table][i].action == "edit") {
          save = await savedata.findOneAndUpdate(
            { _id: new ObjectId(data[data.table][i].id_origin) },
            data[data.table][i],
            {
              returnOriginal: false,
            }
          );
        }
        if (save) {
          let dte = {
            table: data.table,
            action: data[data.table][i].action,
            id_origin: data[data.table][i]._id,
            date: data[data.table][i].date,
          };
          const insertar = await modellogs.create(dte);
          //console.log(insertar)
          if (insertar) {
            await modelserverstatelogslogs.insertMany(
              await groupjson(insertar._id, data.idserver)
            );
            resultstate.push({
              idlog: data[data.table][i].idlog,
              stateres: true,
            });
          }
        }

        //  console.log(save)
      } catch (error) {
        console.log(error.toString());
        resultstate.push({
          idlog: data[data.table][i].idlog,
          stateres: false,
          notes: error.toString(),
        });
      }
    }

    // console.log(data[data.table].length)
    return resultstate;
  } catch (error) {
    console.log(error);
  }
};
module.exports = LogsModels;
