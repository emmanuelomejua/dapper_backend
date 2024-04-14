const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: { type: String, enum: ["children", "adult"], required: true },
  images: [], // Array of strings (image URLs or file paths)
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
