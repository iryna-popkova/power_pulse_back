const Product = require("../../models/productsModel");

const filteredProducts = async (req, res) => {
  try {
    const userBloodType = req.user.blood;
    const products = await Product.find({
      $or: [
        { groupBloodNotAllowed: { $exists: false } },
        { [`groupBloodNotAllowed.${userBloodType}`]: { $exists: false } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = filteredProducts;
