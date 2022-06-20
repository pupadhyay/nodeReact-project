const mongoose = require("mongoose");

// scheme creation
const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
});
// scheme modal
module.exports = mongoose.model("products", productSchema); // users is name of table in database
