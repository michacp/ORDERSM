const OrderModels = {};
const modelbrand = require("../modelsdb/brands");
const modelmodel = require("../modelsdb/models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const modelpriority = require("../modelsdb/prioritys");
const modeltype = require("../modelsdb/order_types");
const modelorder = require("../modelsdb/orders");
const modelimei = require("../modelsdb/imeis");
const modelimeisdevices = require("../modelsdb/imeis_devices");
const { newId } = require("../config/objectId");
const device_orders = require("../modelsdb/device_orders");
const modelserver = require("../modelsdb/serverusers");
//const modelstatenumber=require("../modelsdb/state_numbers")
const modeluser_branche_number_orders = require("../modelsdb/user_branche_number_orders");
const { getNextSequenceValue } = require("../config/sequorders");
const modelstateorders = require("../modelsdb/state_numbers");
const modeluser = require("../modelsdb/users");
const modelissuetype = require("../modelsdb/issue_types");
const modelstateorden = require("../modelsdb/state_orders");
const modelnumbersorders=require("../modelsdb/number_orders")
const modelstatenumber=require("../modelsdb/state_numbers")
const modelcontactorders=require("../modelsdb/contacts_orders")
const modelpayments=require("../modelsdb/payments")
const modelnotes=require("../modelsdb/notes")
const modelreasons=require("../modelsdb/reasons")
const modelcauses_reasons=require("../modelsdb/cause_reasons")
const modelcause_reasons_orders=require("../modelsdb/cause_reason_orders")
OrderModels.listpriority = async () => {
  try {
    const groupww = await modelpriority.aggregate([
      { $sort: { name: 1 } },
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
OrderModels.listtypeorder = async () => {
  try {
    const groupww = await modeltype.aggregate([
      { $sort: { name: 1 } },
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

OrderModels.listissuetype = async () => {
  try {
    const groupww = await modelissuetype.aggregate([
      { $sort: { name_issue: 1 } },
      {
        $project: {
          _id: 1,
          name_issue: 1,
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

OrderModels.listbrands = async () => {
  try {
    const groupww = await modelbrand.aggregate([
      { $sort: { name: 1 } },
      {
        $project: {
          _id: 1,
          name_brands: 1,
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
OrderModels.listreasons = async () => {
  try {
    const groupww = await modelreasons.aggregate([
      { $sort: { name: 1 } },
      {
        $project: {
          _id: 1,
          name_reasons: 1,
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
OrderModels.listmodels = async (data) => {
  try {

    const groupww = await modelmodel.aggregate([
      {
        $match: {
          id_brands: new ObjectId(data),
        },
      },
      { $sort: { name: 1 } },
      {
        $project: {
          _id: 1,
          business_model: 1,
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
OrderModels.listcauses = async (data) => {
  try {

    const groupww = await modelcauses_reasons.aggregate([
      {
        $match: {
          id_reason: new ObjectId(data),
        },
      },
      {
        $lookup: {
          from: "causes",
          localField: "id_cause",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                name_causes: 1,
              },
            },
          ],
          as: "causes",
        },
      },
      { $unwind: "$causes" },
      {
        $project: {
          _id: 1,
          causes: 1,
        },
      },
    ]);
  // console.log(groupww)
    return groupww;
  } catch (err) {
    console.log(err);
    return false;
  }
};

OrderModels.new = async (data, datauser) => {
  
  try {
    const deviceid = await findorcreatedevice(await newiddata(data));
    
    // console.log(data)
    if (deviceid) {
      if (deviceid.statusdup) {
        return deviceid;
      } else {
        numberor = await finduser_number(datauser, await newiddata(data));
        
        if (numberor) {
          data.id_device = deviceid;
          data.id_number = numberor;
          /**
           * SAVE ORDERS
           */
          
          const insertar = await modelorder.create(await newiddata(data));
          
          await modelnumbersorders.create(await savenum_orders(data,insertar._id))
          
          await changeuser_branches_orders(data.id_number)
         await modelcontactorders.insertMany(data.contacts)
         await agregatepayments(insertar._id,data.payments)
         await agregatenotes(insertar._id,data.notes)
         await agregatecause_reasons_orders(insertar._id,data.cause_reasons)
        // await modelpayments.create({})
          if (insertar === "error") {
            console.log("ERROR");

            return false;
          } else {
            // await Logs.log(insertar._id, "customers", "create");
            return true;
          }
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);

    return false;
  }
};

OrderModels.numberorderperuserserver = async () => {
  try {
    await modeluser_branche_number_orders.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);
  } catch (error) {}
};

OrderModels.numberorderperuserserver = async () => {
  try {
    const mmmm = await modeluser_branche_number_orders.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);
    //console.log(mmmm);
    // create =[
    //   {state_number:'avaliable'},
    //   {state_number:'no avaliable'},
    //   {state_number:'reserved'},
    // ]
    // await modelstatenumber.insertMany(create)

    const myAggregate = await modelserver.aggregate([
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
    // const myAggregatenumbers=await
    return myAggregate;
  } catch (error) {
    console.log(error);
  }
};

OrderModels.numberorder = async (user) => {
  // const userdata = await modeluser.aggregate([
  //   {
  //     $match: {
  //       name_user: user,
  //     },
  //   },

  //   {
  //     $lookup: {
  //       from: "state_users",
  //       localField: "state_user",
  //       foreignField: "_id",
  //       pipeline: [
  //         {
  //           $match: {
  //             name: "ENABLE",
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: 1,
  //             name: 1,
  //           },
  //         },
  //       ],
  //       as: "state",
  //     },
  //   },
  //   { $unwind: "$state" },
  //   {
  //     $project: {
  //       _id: 1,
  //     },
  //   },
  // ]);

  const aaaa = await modelstateorders.aggregate([
    {
      $match: {
        state_number: "RESERVED",
      },
    },
    {
      $project: {
        _id: 1,
      },
    },
  ]);
  //console.log(user)
  const isreservednumber = await modeluser_branche_number_orders.aggregate([
    {
      $match: {
        id_employees: new ObjectId(user),
        id_statenumber: aaaa[0]._id,
        id_branches: new ObjectId("649ca6fe27dc1c1b91331c81"),
      },
    },
    {
      $project: {
        _id: 1,
        number: 1,
      },
    },
  ]);
  // console.log(isreservednumber);
  if (isreservednumber.length > 0) {
    //console.log(isreservednumber)
    return isreservednumber[0].number;
  } else {
    const number = await modeluser_branche_number_orders.create({
      _id: await newId(),
      number: await getNextSequenceValue("sequorder"),
      id_employees: new ObjectId(user),
      id_branches: new ObjectId("649ca6fe27dc1c1b91331c81"),
      id_statenumber: aaaa[0]._id,
    });
    //console.log(number)
    return number.number;
  }
};

/**
 *
 * funciones extra
 */

async function findorcreatedevice(data) {
  try {
    const imeisdata = await Promise.all(
      data.imei.map(async function (num) {
        const data = {
          _id: await newId(),
          imei: num.imei,
        };
        return data;
      })
    );

    const insertarimei = await modelimei.insertMany(imeisdata);
    const datadeviceorder = { _id: await newId(), id_model: data.id_model };
    //console.log(datadeviceorder)
    const insertarveviceorder = await device_orders.create(datadeviceorder);
    const imeisdevicess = await Promise.all(
      insertarimei.map(async function (num) {
        return {
          _id: await newId(),
          id_device: insertarveviceorder._id,
          id_imei: num._id,
          id_status: "64ce65c9b9d6e35012f53658",
        };
      })
    );
    // console.log(imeisdevicess)
    await modelimeisdevices.insertMany(imeisdevicess);
    return insertarveviceorder._id;
  } catch (error) {
    try {
      // console.log(data)
      const imeis = await data.imei.map(function (num) {
        return num.imei;
      });

      const mmmm = await device_orders.aggregate([
        //
        {
          $lookup: {
            from: "imeis_devices",
            localField: "_id",
            foreignField: "id_device",
            pipeline: [
              {
                $lookup: {
                  from: "imeis",
                  localField: "id_imei",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $match: {
                        imei: {
                          $in: imeis,
                        },
                      },
                    },
                  ],
                  as: "imeis",
                },
              },
              { $unwind: "$imeis" },
              {
                $lookup: {
                  from: "state_imeis",
                  localField: "id_status",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $match: {
                        state_imei: "ACTIVE",
                      },
                    },
                  ],
                  as: "state_imei",
                },
              },
              { $unwind: "$state_imei" },
              {
                $project: {
                  _id: 1,
                },
              },
            ],
            as: "imeis_devi",
          },
        },
        { $unwind: "$imeis_devi" },
        {
          $project: {
            _id: 1,
            id_model: 1,
          },
        },
        { $group: { _id: "$_id", id_model: { $first: "$id_model" } } },
      ]);

      if (mmmm.length == 1) {
        if (data.id_model == mmmm[0].id_model.toString()) {
          return mmmm[0]._id;
        } else {
          // console.log(data.id_model,)
          return {
            statusdup: true,
            mensage: "UN IMEI YA PERTENECE A UN DISPOSITIVO",
          };
        }

        // return mmmm[0]._id;
      } else {
        if (mmmm.length > 1) {
          return {
            statusdup: true,
            mensage: "UN IMEI YA PERTENECE A UN DISPOSITIVO",
          };
        } else {
          return false;
        }
      }
    } catch (error) {
      return false;
    }
  }
}
async function finduser_number(datauser, data) {
  
  try {
    
    const getnumbersave = await numberfunctionorder(datauser.id);
    
    if (
      data.id_number == getnumbersave.number &&
      data.issue_type == (await issuenormal())
    ) {
      return getnumbersave._id;
    } else {
      if (data.issue_type == (await issuephysyca())) {
        try {
          const number = await modeluser_branche_number_orders.create({
            _id: await newId(),
            number: data.id_number,
            id_employees: new ObjectId(datauser.id),
            id_branches: new ObjectId("649ca6fe27dc1c1b91331c81"),
            id_statenumber: new ObjectId("64ce8e2011e407d0a17b8481"),
          });
          //console.log(number.number)
          return number._id;
        } catch (error) {
          return false;
        }
      } else {
       
        return false;
      }
    }

    // return true
  } catch (error) {
    
    return false;
  }
}

async function numberfunctionorder(user) {
  
  const aaaa = await modelstateorders.aggregate([
    {
      $match: {
        state_number: "RESERVED",
      },
    },
    {
      $project: {
        _id: 1,
      },
    },
  ]);
  
  const isreservednumber = await modeluser_branche_number_orders.aggregate([
    {
      $match: {
        id_employees: new ObjectId(user),
        id_statenumber: aaaa[0]._id,
        id_branches: new ObjectId("649ca6fe27dc1c1b91331c81"),
      },
    },
    {
      $project: {
        _id: 1,
        number: 1,
      },
    },
  ]);
  //console.log(isreservednumber);
  if (isreservednumber.length > 0) {
    //console.log(isreservednumber)
    return isreservednumber[0];
  } else {
    try {
      
      const number = await modeluser_branche_number_orders.create({
        _id:await newId(),
        number: await getNextSequenceValue("sequorder"),
        id_employees: new ObjectId(user),
        id_branches: new ObjectId("649ca6fe27dc1c1b91331c81"),
        id_statenumber: aaaa[0]._id,
      });
    
      return number;
    } catch (error) {
      //console.log(error)
    }

  }
}
async function issuephysyca() {
  try {
    const groupww = await modelissuetype.aggregate([
      {
        $match: {
          name_issue: "PHYSIC",
        },
      },
      { $sort: { name_issue: 1 } },
      {
        $project: {
          _id: 1,
        },
      },
    ]);
    //console.log(groupww)
    return groupww[0]._id;
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function issuenormal() {
  try {
    const groupww = await modelissuetype.aggregate([
      {
        $match: {
          name_issue: "NORMAL",
        },
      },
      { $sort: { name_issue: 1 } },
      {
        $project: {
          _id: 1,
        },
      },
    ]);
    //console.log(groupww)
    return groupww[0]._id;
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function savenum_orders(data,orderid) {
  //console.log(data);
  try {
    const datasave= {_id:await newId(),
  
      id_state_orders:await stateorden("OPEN"),
      id_user_branche_number_orders:data.id_number,
      id_orders:orderid,
      date:Date.now(),
      id_issue_type:data.issue_type}
    
      return datasave
  } catch (error) {
   
    return false
  }

}
async function newiddata(data) {
  data._id = await newId();
  //console.log(data._id);
  return data;
}
async function stateorden(data) {
  try {
    const groupww = await modelstateorden.aggregate([
      {
        $match: {
          name_state_orders:data ,
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);
    return groupww[0]._id;
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function changeuser_branches_orders(data){
try {
  const state=await getstatenumber("NO AVALIABLE")
 const ddd=await modeluser_branche_number_orders.findOneAndUpdate(
  { _id: data },
  {id_statenumber:state} ,
  {
    returnOriginal: false,
  }
  )
 // console.log(ddd)
} catch (error) {
  console.log(error)
}
}

async function getstatenumber(data){
  try {
    const aaaa = await modelstateorders.aggregate([
      {
        $match: {
          state_number: data,
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);
   return aaaa[0]._id
  } catch (error) {
    return false
  }

}
async function agregatecause_reasons_orders(order,data){
  try {
    save={
      _id:await newId()  ,
      id_orders:order,
      id_cause_reason:data
    }
    await modelcause_reasons_orders.create(save)
  } catch (error) {
    
  }
}

async function agregatenotes(data,not){
  try {
    save={
      _id:await newId()  ,
      id_orders:data  ,
      note:not ,
      date:Date.now() ,
    }
   // console.log(save)
  await modelnotes.create(save)
    
  } catch (error) {
    console.log(error)
  }

 
}
async function agregatepayments(data,value){
  save={
    _id:await newId()  ,
    id_orders:data  ,
    amount:parseFloat(value)  ,
    date:Date.now() ,
  }
 // console.log(save)
modelpayments.create(save)
}
module.exports = OrderModels;
