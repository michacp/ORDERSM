const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const groupScheme = new mongoose.Schema({
    name: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },

},
{timestamps:true});
groupScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('group',groupScheme)