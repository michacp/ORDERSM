const Servesh = {};
const bq = require("../helpers/bcryptjs");
modelserverusers = require("../modelsdb/serverusers");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

Servesh.find = async (data) => {
  try {
    // const findcli = await db.query(
    //   "SELECT id_serverusers,name_server,state_server,name,idstate FROM serverusers INNER JOIN state ON state_server=idstate where id_serverusers=?",
    //  data
    //   );
    myAggregate = await modelserverusers.aggregate([
      {
        $match: {
          name_server: data,
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "state_server",
          foreignField: "_id",
          pipeline: [
            {
              $match: {
                name: "ENABLE",
              },
            },
          ],
          as: "stateservers",
        },
      },
      { $unwind: "$stateservers" },
      {
        $project: {
          _id: 1,
          name_server: 1,
          password_server: 1,
        },
      },
    ]);
    //console.log(myAggregate)
    return myAggregate;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = Servesh;
