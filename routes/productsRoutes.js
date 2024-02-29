const express = require("express");

const { ctrlWrapper } = require("../helpers");

const { authenticate, validateBody } = require("../midleware");

const { ProductsCategory } = require("../models");

const {
  filteredProducts,
  productsCategoriesList,
} = require("../controllers/productsControllers");

const productsRouter = express.Router();

productsRouter.get(
  "/categories",
  authenticate,
  validateBody(ProductsCategory.categoriesSchema),
  ctrlWrapper(productsCategoriesList)
);

productsRouter.get("/filter", authenticate, ctrlWrapper(filteredProducts));

module.exports = productsRouter;
