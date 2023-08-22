const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const state_ordersScheme = new mongoose.Schema({
    name_state_orders: {
    type: String,
    unique: true,
    required: true,
  },

},
{timestamps:true});
state_ordersScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('state_orders',state_ordersScheme)