const { Schema, model } = require("mongoose");

const categoriesSchema = new Schema({
  title: {
    type: String,
  },
});

const ProductsCategory = model("productsCategory", categoriesSchema);
module.exports = { ProductsCategory };