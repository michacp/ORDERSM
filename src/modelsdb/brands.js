const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const brandsScheme = new mongoose.Schema({
    name_brands: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },
  logo_brand: {
    type: String,
    unique: true,
  },
},
{timestamps:true});
brandsScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('brands',brandsScheme)