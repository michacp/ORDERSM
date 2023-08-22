const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const imeisScheme = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
    imei: {
    type: String,
    unique: true,
    required: true,
  },

},
{timestamps:true});
imeisScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('imeis',imeisScheme)