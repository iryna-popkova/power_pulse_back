const { Product } = require("../../models");
const { HttpError } = require("../../helpers");

const getAllProducts = async (req, res) => {
  const result = await Product.find();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getAllProducts;
