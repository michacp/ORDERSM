const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const EmployeesScheme = new mongoose.Schema(
  {
    first_name1: {
      type: String,
      uppercase: true,
      required: true,
    },
    first_name2: {
      type: String,
      uppercase: true,
     
    },
    last_name1: {
      type: String,
      uppercase: true,
      required: true,
    },
    last_name2: {
      type: String,
      uppercase: true,
      
    },
    dni: {
      type: String,
      required: true,
      unique: true,
    },

    birthdate: {
      type: String,
      required: true,
    },
    date_of_admission: {
      type: String,
      required: true,
    },
    email_personal: {
      type: String,
      required: true,
      unique: true,
    },
    email_business: {
      type: String,
      required: true,
    },
    addres: {
      type: String,
      uppercase: true,
      required: true,
    },
    phone_personal: {
      type: String,
      required: true,
    },
    phone_business: {
      type: String,
      required: true,
    },

    gender: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
EmployeesScheme.plugin(aggregatePaginate);
module.exports = mongoose.model("employees", EmployeesScheme);
