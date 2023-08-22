const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const issue_typesScheme = new mongoose.Schema({
    name_issue: {
    type: String,
    unique: true,
    required: true,
  },

},
{timestamps:true});
issue_typesScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('issue_types',issue_typesScheme)