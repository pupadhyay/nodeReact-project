const mongoose = require("mongoose");

// scheme creation
const userScheme = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
// scheme modal
module.exports = mongoose.model("users", userScheme); // users is name of table in database
