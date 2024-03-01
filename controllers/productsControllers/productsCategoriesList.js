const fs = require("fs");
const path = require("path");

const productCategoriesList = (req, res) => {
  const filePath = path.join(
    __dirname,
    "../../services/productsCategories.json"
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }

    try {
      const categories = JSON.parse(data);
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error parsing JSON data" });
    }
  });
};

module.exports = productCategoriesList;
