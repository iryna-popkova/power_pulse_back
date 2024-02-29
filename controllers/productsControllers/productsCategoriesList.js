const { ProductsCategory } = require("../../models");
const productsCategories = require("../../services/productsCategories.json");

const productsCategoriesList = async (req, res, next) => {
  const result = await ProductsCategory.find({});

  res.status(200).json(result);
};

module.exports = productsCategories;
