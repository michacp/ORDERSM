const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const CustomersScheme = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
      
    },
    first_name1: {
      type: String,
      uppercase: true,
      required: true,
    },
    last_name1: {
      type: String,
      uppercase: true,
      required: true,
    },
    dni: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    addres: {
      type: String, 
      uppercase: true, 
    },
    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: mongoose.Types.ObjectId,
      
    },
    age: {
      type: mongoose.Types.ObjectId,
      
    },
  },
  { timestamps: true }
);
CustomersScheme.plugin(aggregatePaginate);
module.exports = mongoose.model("customers", CustomersScheme);