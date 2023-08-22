const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const number_ordersScheme = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_state_orders: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_user_branche_number_orders: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_orders: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    id_issue_type: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
number_ordersScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("number_orders", number_ordersScheme);
