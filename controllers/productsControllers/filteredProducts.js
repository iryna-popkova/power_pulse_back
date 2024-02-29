const { Product } = require("../../models");

const filteredProducts = async (req, res, next) => {
  const result = await Product.find({});

  res.status(200).json(result);
};

module.exports = filteredProducts;
