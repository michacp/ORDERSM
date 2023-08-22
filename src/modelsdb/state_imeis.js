const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const state_imeisScheme = new mongoose.Schema({
    state_imei: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },

},
{timestamps:true});
state_imeisScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('state_imeis',state_imeisScheme)