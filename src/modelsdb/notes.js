const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const notesScheme = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  id_orders: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },

  note: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },

},
{timestamps:true});
notesScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('notes',notesScheme)