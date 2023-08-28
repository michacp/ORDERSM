const Servesh = {};
const bq = require("../helpers/bcryptjs");
modelserverusers = require("../modelsdb/serverusers");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

Servesh.find = async (data,statusserver) => {
  try {
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
                name: statusserver,
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
    return myAggregate;
  } catch (err) {
    console.log(err);
    return false;
  }
};


module.exports = Servesh;
