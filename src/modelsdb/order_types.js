const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const order_typesScheme = new mongoose.Schema({
    name: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },

},
  { timestamps: true }
);
order_typesScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('order_types',order_typesScheme)