const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const imeis_devicesScheme = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_device: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_imei: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    id_status: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
imeis_devicesScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("imeis_devices", imeis_devicesScheme);
