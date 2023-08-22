const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const state_numbersScheme = new mongoose.Schema({
    state_number: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },

},
{timestamps:true});
state_numbersScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('state_numbers',state_numbersScheme)