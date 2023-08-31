const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const state_userScheme = new mongoose.Schema({
    name: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },

},
{timestamps:true});
state_userScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('state_user',state_userScheme)