
const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const BranchesScheme = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },
  addres: {
    type: String,
    uppercase: true,
    required: true,
  },
  reference: {
    type: String,
    uppercase: true,
    required: true,
  },
  phone: {
    type: String,
  },
  id_state: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
 code: {
    type: String,
    required: true,
  },


},
{timestamps:true});
BranchesScheme.plugin(aggregatePaginate)
module.exports=mongoose.model('branches',BranchesScheme)