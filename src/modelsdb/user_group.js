const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const user_groupScheme = new mongoose.Schema(
  {
    id_group_user_groups: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    id_user_user_groups: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
user_groupScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("user_group", user_groupScheme);
