const Product = require("../../models/productsModel");

const filteredProducts = async (req, res) => {
  try {
    const userBloodType = req.user.blood;
    const products = await Product.find({
      $or: [
        // If groupBloodNotAllowed field does not exist or is empty, allow the product
        { groupBloodNotAllowed: { $exists: false } },
        // If the user's blood type is not explicitly denied for the product, allow it
        { [`groupBloodNotAllowed.${userBloodType}`]: { $ne: true } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = filteredProducts;
