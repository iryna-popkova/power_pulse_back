const express = require("express");

const { authenticate } = require("../midleware");

const {
  filteredProducts,
  productCategoriesList,
  getAllProducts,
} = require("../controllers/productsControllers");

const productsRouter = express.Router();

productsRouter.get("/", authenticate, getAllProducts);
productsRouter.get("/filter", authenticate, filteredProducts);
productsRouter.get("/categories", authenticate, productCategoriesList);

module.exports = productsRouter;
