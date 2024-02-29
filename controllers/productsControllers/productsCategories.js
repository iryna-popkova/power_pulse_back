const { ProductsCategory } = require("../models/categoriesModel");
const productsCategories = require("../../services/productsCategories.json");

const productsCategories = async (req, res, next) => {
  const result = await ProductsCategory.find({});

  res.status(200).json(result);
};

module.exports = {
  productsCategories,
};
