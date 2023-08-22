const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const device_ordersScheme = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  id_model: {
        type: mongoose.Types.ObjectId,
        required: true,
      },

},
{timestamps:true});
device_ordersScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('device_orders',device_ordersScheme)