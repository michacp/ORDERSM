const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const causesScheme = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  name_causes: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },

},
{timestamps:true});
causesScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('causes',causesScheme)