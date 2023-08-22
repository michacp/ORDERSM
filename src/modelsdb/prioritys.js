const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const prioritysScheme = new mongoose.Schema({
    name: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },

},
{timestamps:true});
prioritysScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('prioritys',prioritysScheme)