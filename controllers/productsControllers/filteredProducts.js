const { Product } = require("../../models");
const { HttpError } = require("../../helpers");

const filteredProducts = async (req, res) => {
  const { category, search, recommended } = req.query;
  const where = {};

  if (category) {
    where.category = category;
  }
  if (search) {
    where.title = { $regex: search, $options: "i" };
  }

  if (recommended) {
    const { user: id } = req;
    const user = await User.findById(id);
    const bloodType = user.bodyParams.blood;
    if (!bloodType) {
      throw HttpError(404);
    }

    if (recommended === "true") {
      where[`groupBloodNotAllowed.${bloodType}`] = true;
    } else {
      where[`groupBloodNotAllowed.${bloodType}`] = false;
    }
  }
  const { page = 1, limit = 100 } = req.query;
  const total = await Product.find(where).count();
  const products = await Product.find(where)
    .limit(limit)
    .skip(limit * (page - 1));
  if (!products) {
    throw HttpError(400);
  }
  res.json({
    total,
    page,
    limit,
    products,
  });
};

module.exports = filteredProducts;
