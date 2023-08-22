const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const user_branche_number_ordersScheme = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
    number: {
    type: Number,
    required: true,
  },
  id_employees: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  id_branches: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  id_statenumber: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

},
{timestamps:true});
user_branche_number_ordersScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('user_branche_number_orders',user_branche_number_ordersScheme)