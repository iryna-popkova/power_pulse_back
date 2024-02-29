const express = require("express");

const { ctrlWrapper } = require("../helpers");

const { authenticate } = require("../midleware");

const {
  filteredProducts,
  productsCategories,
} = require("../controllers/productsControllers");

const productsRouter = express.Router();

productsRouter.get(
  "/categories",
  authenticate,
  ctrlWrapper(productsCategories)
);

productsRouter.get("/filter", authenticate, ctrlWrapper(filteredProducts));

module.exports = productsRouter;
