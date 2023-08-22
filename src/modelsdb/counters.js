const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const countersScheme = new mongoose.Schema({
  schemaname: {
    type: String,
    unique: true,
    required: true,
  },
  sequence_value: {
    type: Number,
    unique: true,
    required: true,
  },
});
countersScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("counters", countersScheme);
