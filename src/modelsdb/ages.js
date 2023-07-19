const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const agesScheme = new mongoose.Schema({
    name: {
    type: String,
    unique: true,
    required: true,
  },

},
{timestamps:true});
agesScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('ages',agesScheme)