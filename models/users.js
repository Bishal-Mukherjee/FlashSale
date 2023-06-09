const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  designation: {
    type: String, // admin, customer
  },
  gender: {
    type: String,
  },
  contactnumber: {
    type: String,
  },
  cart: {
    type: Array,
  },
  orders: {
    type: Array,
  },
  address: {
    type: Object,
  },
});

module.exports = User = mongoose.model("user", userSchema);
