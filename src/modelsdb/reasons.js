const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const reasonsScheme = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  name_reasons: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },

},
{timestamps:true});
reasonsScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('reasons',reasonsScheme)