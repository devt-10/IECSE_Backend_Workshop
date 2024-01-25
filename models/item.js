const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  id: Number,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
