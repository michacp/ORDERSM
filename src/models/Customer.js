const CustomersModels = {};
const bq = require("../helpers/bcryptjs");
const modelcustomers = require("../modelsdb/customers");
const Logs=require("../models/Logs")
const modelage = require("../modelsdb/ages");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

CustomersModels.new = async (data) => {
  try {
    const insertar = await modelcustomers.create(data);
    const insetarlog=await Logs.log(insertar._id,'customers','create')
    
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
CustomersModels.edit = async (data) => {
  try {
    const insertar = await modelcustomers.findOneAndUpdate(
      { _id: data._id },
      {
        first_name1: data.first_name1,
        last_name1: data.last_name1,
        email: data.email,
        addres: data.addres,
        phone: data.phone,
        gender: new ObjectId(data.gender),
        age: new ObjectId(data.age),
      },
      {
        returnOriginal: false,
      }
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

CustomersModels.Findone = async (data) => {
  //console.log(data)
  try {
    const myAggregate = await modelcustomers.aggregate([
      {
        $match: {
          _id: new ObjectId(data),
        },
      },
      {
        $lookup: {
          from: "genders",
          localField: "gender",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: "gender",
        },
      },
      { $unwind: "$gender" },
      {
        $lookup: {
          from: "ages",
          localField: "age",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: "age",
        },
      },
      { $unwind: "$age" },

      {
        $project: {
          _id: 1,
          first_name1: 1,
          last_name1: 1,
          dni: 1,
          email: 1,
          addres: 1,
          phone: 1,
          gender: 1,
          age: 1,
        },
      },
    ]);

    // respuesta.aggregate
    // console.log(JSON.stringify(myAggregate));
    return myAggregate;
  } catch (err) {
    console.log(err);
    return false;
  }
};
CustomersModels.Findby = async (data) => {
  try {
    var findby = data.findlike;
    var myAggregate;
    var page = data.pagination;
    var numPerPage = data.numperpage;
    var skip = (page - 1) * numPerPage;
    if (!data.findlike) {
      findby = "";
    }
    myAggregate = await modelcustomers.aggregate([
      {
        $match: {
          dni: { $regex: findby },
        },
      },
      {
        $lookup: {
          from: "genders",
          localField: "gender",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: "gender",
        },
      },
      { $unwind: "$gender" },
      {
        $lookup: {
          from: "ages",
          localField: "age",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: "age",
        },
      },
      { $unwind: "$age" },

      {
        $project: {
          _id: 1,
          first_name1: 1,
          last_name1: 1,
          dni: 1,
          email: 1,
          addres: 1,
          phone: 1,
          gender: 1,
          age: 1,
        },
      },

      { $sort: { order_number: -1 } },
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
      numero_de_paginas: numero_de_paginas,
      pagina_actual: page,
      numero_de_entradas: total,
      numero_entradas_por_pagina: numPerPage,
      consumo: myAggregate[0].data,
    };
    return respuesta;
  } catch (err) {
    console.log(err);
    return false;
  }
};
CustomersModels.listage = async () => {
  try {
    const groupww = await modelage.aggregate([
      
        { $sort : { name : 1 } },
        {
          $project: {
            _id: 1,
            name: 1,
          },
        },
     
    ]);
    //console.log(groupww)
    return groupww;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = CustomersModels;
