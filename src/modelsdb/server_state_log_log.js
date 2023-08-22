const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const server_state_log_logScheme = new mongoose.Schema(
  {
    server_state_log: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_logs: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_server: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    notes: {
      type: String,
      default: ''
    },
  },

  { timestamps: true }
);
server_state_log_logScheme.plugin(aggregatePaginate);
module.exports = mongoose.model(
  "server_state_log_logs",
  server_state_log_logScheme
);
