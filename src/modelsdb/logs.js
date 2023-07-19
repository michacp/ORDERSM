const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const logsScheme = new mongoose.Schema(
  {
    table: {
      type: String,
      required: true,
    },
    
      action: {
        type: String,
        required: true,
      },
    
    
      date: {
        type: String,
        required: true,
      },
   
      id_origin: {
        type: String,
        required: true,
      },
    
  },
  
  { timestamps: true }
);
logsScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("logs", logsScheme);
