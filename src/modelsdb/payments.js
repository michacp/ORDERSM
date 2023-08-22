const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const paymentsScheme = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  id_orders: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  amount: {
    type:  mongoose.Types.Decimal128,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },

},
{timestamps:true});
paymentsScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('payments',paymentsScheme)