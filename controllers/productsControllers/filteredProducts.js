const { Product } = require("../../models");
const { HttpError } = require("../../helpers");
const getAllProducts = require("./getAllProducts");

const filteredProducts = async (req, res) => {
  try {
    const { keyword, category, recommended } = req.query;
    const userBloodType = req.user.blood;

    if (!keyword && !category && recommended === undefined) {
      return getAllProducts(req, res);
    }

    let baseQuery = {};

    if (keyword) {
      baseQuery.title = { $regex: keyword, $options: "i" };
    }

    if (category) {
      baseQuery.category = category;
    }
    if (recommended !== undefined) {
      if (recommended === "true") {
        baseQuery[`groupBloodNotAllowed.${userBloodType}`] = false;
      } else if (recommended === "false") {
        baseQuery[`groupBloodNotAllowed.${userBloodType}`] = true;
      }
    }

    const products = await Product.find(baseQuery);

    res.status(200).json({
      products,
    });
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = filteredProducts;
