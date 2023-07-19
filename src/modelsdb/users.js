const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const UserScheme = new mongoose.Schema(
  {
    name_user: {
      type: String,
      unique: true,
      required: true,
    },
    pasword_user: {
      type: String,
      required: true,
    },

    state_user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    employees_user: {
      type: mongoose.Types.ObjectId,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);
UserScheme.plugin(aggregatePaginate);
module.exports = mongoose.model("user", UserScheme);
