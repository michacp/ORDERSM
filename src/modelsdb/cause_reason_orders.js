const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const cause_reason_ordersScheme = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  id_orders: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  id_cause_reason: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  }

},
{timestamps:true});
cause_reason_ordersScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('cause_reason_orders',cause_reason_ordersScheme)