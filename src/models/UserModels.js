const UserModels = {};
const bq = require("../helpers/bcryptjs");
const modeluser = require("../modelsdb/users");
const modelestate = require("../modelsdb/state_user");
const modelgroup = require("../modelsdb/group");
const modeluser_group = require("../modelsdb/user_group");
const mongoose = require("mongoose");
const gene = require("../modelsdb/gender");
const modelemployee = require("../modelsdb/employees");

const ObjectId = mongoose.Types.ObjectId;
/**
 * CREAR USUARIOS
 */
UserModels.create = async (data) => {
  try {
    if (data.pasword_user == data.pasword_user1) {
      delete data.pasword_user1;
      //console.log(data)
      //const insertar1 = await modelestate.find({name:"ENABLE"});
      //data.state_user=new ObjectId(insertar1[0]._id);
      const insertaremplo = await modelemployee.create(data);
      data.employees_user = insertaremplo._id;
      data.pasword_user = bq.bcrypt(data.pasword_user);
      const insertar = await modeluser.create(data);

      const insertargroup = await modeluser_group.insertMany(
        groupjson(data.group, insertar._id)
      );
      // console.log(insertargroup);
      //const insertar = await db.query("insert into user set ?", [data]);
      //console.log(insertar._id);
      if (insertar === "error") {
        console.log("ERROR");
      } else {
        return insertar;
      }
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

UserModels.getby = async (data) => {
  try {
    //console.log(data)
    var findby = data.findlike;
    var myAggregate;
    var page = data.pagination;
    var numPerPage = data.numperpage;
    var skip = (page - 1) * numPerPage;
    if (!data.findlike) {
      findby = "";
    }

    if (data.allclients == 0) {
      myAggregate = await modeluser.aggregate([
        {
          $match: {
            name_user: { $regex: findby },
          },
        },
        {
          $lookup: {
            from: "user_groups",
            localField: "_id",
            foreignField: "id_user_user_groups",
            pipeline: [
              {
                $lookup: {
                  from: "groups",
                  localField: "id_group_user_groups",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        _id: 1,
                        name: 1,
                      },
                    },
                  ],
                  as: "group",
                },
              },
              { $unwind: "$group" },
              {
                $project: {
                  _id: 1,
                  id_group_user_groups: 1,
                  id_user_user_groups: 1,
                  group: 1,
                },
              },
            ],
            as: "user_groups",
          },
        },
        {
          $lookup: {
            from: "state_users",
            localField: "state_user",
            foreignField: "_id",
            pipeline: [
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
          $lookup: {
            from: "employees",
            localField: "employees_user",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  first_name1: 1,
                  last_name1: 1,
                },
              },
            ],
            as: "employees",
          },
        },
        { $unwind: "$employees" },
        {
          $project: {
            _id: 1,
            name_user: 1,
            user_groups: 1,
            state: 1,
            employees: 1,
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
    } else {
      myAggregate = await modeluser.aggregate([
        {
          $match: {
            state_user: new ObjectId(data.allclients),
            name_user: { $regex: findby },
          },
        },
        {
          $lookup: {
            from: "user_groups",
            localField: "_id",
            foreignField: "id_user_user_groups",
            pipeline: [
              {
                $lookup: {
                  from: "groups",
                  localField: "id_group_user_groups",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        _id: 1,
                        name: 1,
                      },
                    },
                  ],
                  as: "group",
                },
              },
              { $unwind: "$group" },
              {
                $project: {
                  _id: 1,
                  id_group_user_groups: 1,
                  id_user_user_groups: 1,
                  group: 1,
                },
              },
            ],
            as: "user_groups",
          },
        },
        {
          $lookup: {
            from: "state_users",
            localField: "state_user",
            foreignField: "_id",
            pipeline: [
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
          $lookup: {
            from: "employees",
            localField: "employees_user",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  first_name1: 1,
                  last_name1: 1,
                },
              },
            ],
            as: "employees",
          },
        },
        { $unwind: "$employees" },
        {
          $project: {
            _id: 1,
            name_user: 1,
            user_groups: 1,
            state: 1,
            employees: 1,
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
    }
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
    // respuesta.aggregate
    // console.log(JSON.stringify(respuesta.consumo));
    return respuesta;
  } catch (err) {
    console.log(err);
    return false;
  }
};

UserModels.finbdID = async (data) => {
  //console.log(data)
  try {
    const myAggregate = await modeluser.aggregate([
      {
        $match: {
          _id: new ObjectId(data),
        },
      },
      {
        $lookup: {
          from: "user_groups",
          localField: "_id",
          foreignField: "id_user_user_groups",
          pipeline: [
            {
              $lookup: {
                from: "groups",
                localField: "id_group_user_groups",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: {
                      _id: 1,
                      name: 1,
                    },
                  },
                ],
                as: "group",
              },
            },
            { $unwind: "$group" },
            {
              $project: {
                _id: 1,
                id_group_user_groups: 1,
                id_user_user_groups: 1,
                group: 1,
              },
            },
          ],
          as: "user_groups",
        },
      },
      {
        $lookup: {
          from: "state_users",
          localField: "state_user",
          foreignField: "_id",
          pipeline: [
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
        $lookup: {
          from: "employees",
          localField: "employees_user",
          foreignField: "_id",
          pipeline: [
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
              $project: {
                first_name1: 1,
                last_name1: 1,
                first_name2: 1,

                last_name2: 1,
                dni: 1,
                birthdate: 1,
                date_of_admission: 1,
                email_personal: 1,
                email_business: 1,
                addres: 1,
                phone_personal: 1,
                phone_business: 1,

                gender: 1,
              },
            },
          ],
          as: "employees",
        },
      },
      { $unwind: "$employees" },
      {
        $project: {
          _id: 1,
          name_user: 1,

          user_groups: 1,
          state: 1,
          employees: 1,
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

UserModels.edituser = async (data, id, dni) => {
  try {
    delete data.dni;
    const groupww = await modeluser_group.find({ id_user_user_groups: id });
    for (var i = 0; groupww.length > i; i++) {
      var eliminado = true;
      for (var i1 = 0; data.group.length > i1; i1++) {
        if (data.group[i1] == groupww[i].id_group_user_groups) {
          eliminado = false;
          break;
        }
      }
      if (eliminado) {
        await modeluser_group.deleteMany({ _id: groupww[i]._id });
        // console.log(groupww[i]._id, "ELIMINADO");
      }
    }

    for (var i = 0; data.group.length > i; i++) {
      var nuevo = true;
      for (var i1 = 0; groupww.length > i1; i1++) {
        if (data.group[i] == groupww[i1].id_group_user_groups) {
          nuevo = false;
          break;
        }
      }
      if (nuevo) {
        await modeluser_group.create({
          id_group_user_groups: data.group[i],
          id_user_user_groups: id,
        });
        // console.log(data.group[i], "Nuevo");
      }
    }

    delete data._id;

    const insertar = await modeluser.findOneAndUpdate(
      { _id: id },
      { $set: data },
      {
        returnOriginal: false,
      }
    );
    const insertaremployee = await modelemployee.findOneAndUpdate(
      { dni: dni, _id: data._idemployee },
      { $set: data },
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
    // console.log(insertar);
  } catch (err) {
    console.error(err);
    return (inser = false);
  }
};
UserModels.deleteuser = async (data) => {
  try {
    //console.log(data)
    const insertar = await modeluser.deleteOne({ _id: data.id });
    const insertarem = await modelemployee.deleteOne({
      _id: data.id1,
    });
    const insertar13 = await modeluser_group.deleteMany({
      id_user_user_groups: data.id,
    });
    if (
      insertar === "error" ||
      insertarem === "error" ||
      insertar13 === "error"
    ) {
      console.log("ERROR");
      return (insertar1 = false);
    } else {
      return (insertar1 = true);
    }
  } catch (err) {
    console.log(err);
  }
};

UserModels.find = async (data) => {
  try {
   //console.log(data)
    // const finduser = await modeluser.find({ name_user: data.name_user });
    // const insertar = await db.query(
    //   "select name_user,first_name_user,pasword_user,email_user from user where name_user=?",
    //   [data.name_user]
    // );
    // console.log(finduser,insertar)

    const myAggregate = await modeluser.aggregate([
      {
        $match: {
          name_user: data.name_user,
        },
      },
      {
        $lookup: {
          from: "user_groups",
          localField: "_id",
          foreignField: "id_user_user_groups",
          pipeline: [
            {
              $lookup: {
                from: "groups",
                localField: "id_group_user_groups",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: {
                      _id: 1,
                      name: 1,
                    },
                  },
                ],
                as: "group",
              },
            },
            { $unwind: "$group" },
            {
              $project: {
                _id: 1,
                group: 1,
              },
            },
          ],
          as: "user_groups",
        },
      },
      {
        $lookup: {
          from: "state_users",
          localField: "state_user",
          foreignField: "_id",
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
        $lookup: {
          from: "employees",
          localField: "employees_user",
          foreignField: "_id",
          pipeline: [
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
              $project: {
                first_name1: 1,
                last_name1: 1,
                email_business: 1,
                gender: 1,
              },
            },
          ],
          as: "employees",
        },
      },
      { $unwind: "$employees" },
      {
        $project: {
          _id: 1,
          name_user: 1,
          pasword_user: 1,
          user_groups: 1,
          employees: 1,
        },
      },
    ]);

    // respuesta.aggregate
    // console.log(JSON.stringify(myAggregate));

    if (myAggregate === "error") {
      console.log("ERROR");
    } else {
      // console.log(insertar.length);
      if (myAggregate.length === 0) {
        return (inser = false);
      } else {
        return myAggregate; //insertar;
      }
    }
  } catch (e) {
    console.error(e);
    return (inser = false);
  }
};

UserModels.findgroup = async (data, name) => {
  try {
    //console.log(data,name)

    /**
     *
     *
     */
    myAggregate = await modeluser.aggregate([
      {
        $match: {
          name_user: data.user,
        },
      },
      {
        $lookup: {
          from: "user_groups",
          localField: "_id",
          foreignField: "id_user_user_groups",
          pipeline: [
            {
              $lookup: {
                from: "groups",
                localField: "id_group_user_groups",
                foreignField: "_id",
                pipeline: [
                  {
                    $match: {
                      name: name,
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      name: 1,
                    },
                  },
                ],
                as: "group",
              },
            },
            { $unwind: "$group" },
            {
              $project: {
                _id: 1,
                id_group_user_groups: 1,
                id_user_user_groups: 1,
                group: 1,
              },
            },
          ],
          as: "user_groups",
        },
      },
      { $unwind: "$user_groups" },
      {
        $lookup: {
          from: "state_users",
          localField: "state_user",
          foreignField: "_id",
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
          name_user: 1,
          user_groups: 1,
          state: 1,
        },
      },
    ]);

    //console.log(myAggregate)
    /**
     *
     *
     */

    // const insertar = await db.query(
    //   "select name_group from user INNER JOIN user_groups ON id_user=id_user_user_groups INNER JOIN groupss  ON id_group_user_groups=id_grupos where name_user=? AND email_user=? AND first_name_user=? AND name_group=?",
    //   [data.nombre, data.email, data.firstname, name]
    // );

    if (myAggregate === "error") {
      console.log("ERROR");
    } else {
      // console.log(insertar.length);
      if (myAggregate.length === 0) {
        //console.log('ss')
        return (inser = false);
      } else {
        // console.log(insertar)
        return myAggregate;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

UserModels.getgroup = async () => {
  try {
    const groupww = await modelgroup.paginate({});
    const group = groupww.docs;
    return group;
  } catch (err) {
    console.log(err);
    return false;
  }
};

UserModels.getstate = async () => {
  try {
    //   estado={
    //     name:"MALE",

    //   }
    //  const createauxs=await gene.create(estado);
    //  console.log(createauxs)
    const groupww = await modelestate.paginate({});
    const group = groupww.docs;
    return group;
  } catch (err) {
    console.log(err);
    return false;
  }
};
UserModels.getgener = async () => {
  try {
    const groupww = await gene.paginate({});
    const group = groupww.docs;
    return group;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = UserModels;
function groupjson(array, id) {
  let jsongroup = [];
  for (i = 0; i < array.length; i++) {
    jsongroup.push({ id_group_user_groups: array[i], id_user_user_groups: id });
  }
  return jsongroup;
}

UserModels.getemployees = async (data) => {
  try {
    //console.log(data)
    var findby = data.findlike;
    var myAggregate;
    var page = data.pagination;
    var numPerPage = data.numperpage;
    var skip = (page - 1) * numPerPage;
    if (!data.findlike) {
      findby = "";
    }

    if (data.allclients == 0) {
      myAggregate = await modeluser.aggregate([
        {
          $match: {
            name_user: { $regex: findby },
          },
        },
        {
          $lookup: {
            from: "user_groups",
            localField: "_id",
            foreignField: "id_user_user_groups",
            pipeline: [
              {
                $lookup: {
                  from: "groups",
                  localField: "id_group_user_groups",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        _id: 1,
                        name: 1,
                      },
                    },
                  ],
                  as: "group",
                },
              },
              { $unwind: "$group" },
              {
                $project: {
                  _id: 1,
                  id_group_user_groups: 1,
                  id_user_user_groups: 1,
                  group: 1,
                },
              },
            ],
            as: "user_groups",
          },
        },
        {
          $lookup: {
            from: "state_users",
            localField: "state_user",
            foreignField: "_id",
            pipeline: [
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
          $lookup: {
            from: "employees",
            localField: "employees_user",
            foreignField: "_id",
            pipeline: [
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
                $project: {
                  first_name1: 1,
                  last_name1: 1,
                  first_name2: 1,
                  last_name2: 1,
                  dni: 1,
                  birthdate: 1,
                  date_of_admission: 1,
                  gender: 1,
                },
              },
            ],
            as: "employees",
          },
        },
        { $unwind: "$employees" },
        {
          $project: {
            _id: 1,
            name_user: 1,
            user_groups: 1,
            state: 1,
            employees: 1,
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
    } else {
      myAggregate = await modeluser.aggregate([
        {
          $match: {
            state_user: new ObjectId(data.allclients),
            name_user: { $regex: findby },
          },
        },

        {
          $lookup: {
            from: "state_users",
            localField: "state_user",
            foreignField: "_id",
            pipeline: [
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
          $lookup: {
            from: "employees",
            localField: "employees_user",
            foreignField: "_id",
            pipeline: [
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
                $project: {
                  first_name1: 1,
                  last_name1: 1,
                  first_name2: 1,
                  last_name2: 1,
                  dni: 1,
                  birthdate: 1,
                  date_of_admission: 1,
                  gender: 1,
                },
              },
            ],
            as: "employees",
          },
        },
        { $unwind: "$employees" },
        {
          $project: {
            _id: 1,
            name_user: 1,
            user_groups: 1,
            state: 1,
            employees: 1,
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
    }
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
    // respuesta.aggregate
    // console.log(JSON.stringify(respuesta.consumo));
    return respuesta;
  } catch (err) {
    console.log(err);
    return false;
  }
};
