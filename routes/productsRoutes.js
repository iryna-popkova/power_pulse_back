const express = require("express");

const { authenticate } = require("../midleware");

const {
  filteredProducts,
  productsCategoriesList,
} = require("../controllers/productsControllers");

const productsRouter = express.Router();

productsRouter.get("/categories", authenticate, productsCategoriesList);

productsRouter.get("/filter", authenticate, filteredProducts);

module.exports = productsRouter;
