const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
  weight: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  groupBloodNotAllowed: {
    type: Map,
    of: Boolean,
    required: true,
  },
});

const Product = model("product", productsSchema);

module.exports = Product;
