const express = require("express");

const { ctrlWrapper } = require("../helpers/index.js");

const { authenticate } = require("../midleware");

const productsRouter = express.Router();

productsRouter.get(
  "/categories",
  authenticate,
  ctrlWrapper(productsCategories)
);

productsRouter.get("/filter", authenticate, ctrl.filteredProducts);

module.exports = productsRouter;
