const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contacts_ordersScheme = new mongoose.Schema({
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
      
    },
    contact_order: {
      type: String,
      required: true,
    },
  
  },
  {timestamps:true});
  contacts_ordersScheme.plugin(mongoosePaginate)
  module.exports=mongoose.model('contacts_orders',contacts_ordersScheme)