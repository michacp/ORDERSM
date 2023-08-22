const ReasonModels = {};
const modelreasons = require("../modelsdb/reasons");
const Logs=require("../models/Logs")
const {newId}=require("../config/objectId")
ReasonModels.new = async (data) => {
    try {
      data._id=await newId()
      const insertar = await modelreasons.create(data);
    
      
      if (insertar === "error") {
        console.log("ERROR");
        
        return (insertar1 = false);
      } else {
        await Logs.log(insertar._id,'reasons','create')
        return (insertar1 = true);
      }
    } catch (e) {
      console.error(e.toString());
  
      return (insertar1 = false);
    }
  };
  module.exports = ReasonModels;