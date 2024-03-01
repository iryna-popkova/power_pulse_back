const express = require("express");

const { authenticate } = require("../midleware");

const {
  filteredProducts,
  productCategoriesList,
} = require("../controllers/productsControllers");

const productsRouter = express.Router();

productsRouter.get("/", authenticate, filteredProducts);
productsRouter.get("/categories", authenticate, productCategoriesList);

module.exports = productsRouter;
