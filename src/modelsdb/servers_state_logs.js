const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const server_state_logsScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      uppercase: true,
      required: true,
    },
  },
  { timestamps: true }
);
server_state_logsScheme.plugin(aggregatePaginate);
module.exports = mongoose.model("server_state_logs", server_state_logsScheme);