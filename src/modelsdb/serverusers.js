
const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const ServerusersScheme = new mongoose.Schema({
  name_server: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },
  password_server: {
    type: String,
    required: true,
  },
  state_server: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  branches_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  }
},
{timestamps:true});
ServerusersScheme.plugin(aggregatePaginate)
module.exports=mongoose.model('serverusers',ServerusersScheme)