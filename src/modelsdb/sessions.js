const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const sessionsScheme = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
sessionsScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("sessions", sessionsScheme);
