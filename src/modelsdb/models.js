const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const modelsScheme = new mongoose.Schema(
  {
    business_model: {
      type: String,
      uppercase: true,
      unique: true,
      required: true,
    },
    technical_model: {
      type: String,
      uppercase: true,
      unique: true,
      required: true,
    },
    year_model: {
      type: String,
      required: true,
    },
    id_brands: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
modelsScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("models", modelsScheme);
