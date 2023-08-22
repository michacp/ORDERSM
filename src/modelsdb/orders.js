const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ordersScheme = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_customer: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_device: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_order_type: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    parttern: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    income_status_observation: {
      type: String,
      uppercase: true,
      required: true,
    },
    sketch: {
      type: String,
      required: true,
    },
    information_adicional: {
      type: String,
    },
    id_priority: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
ordersScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("orders", ordersScheme);
