const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const cause_reasonsScheme = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  id_reason: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  id_cause: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  }

},
{timestamps:true});
cause_reasonsScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('cause_reasons',cause_reasonsScheme)