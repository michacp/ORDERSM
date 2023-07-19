const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const genderScheme = new mongoose.Schema({
    name: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },

},
{timestamps:true});
genderScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('gender',genderScheme)