const fs = require("fs");
const path = require("path");
const { HttpError } = require("../../helpers");

const productCategoriesList = (req, res) => {
  const filePath = path.join(
    __dirname,
    "../../services/productsCategories.json"
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      throw HttpError(500, "Internal Server Error");
    }

    try {
      const categories = JSON.parse(data);
      res.status(200).json(categories);
    } catch (error) {
      throw HttpError(500, "Internal Server Error");
    }
  });
};

module.exports = productCategoriesList;
