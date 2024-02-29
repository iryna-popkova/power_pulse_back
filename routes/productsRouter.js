const express = require("express");

const { ctrlWrapper } = require("../helpers/index.js");

const { validateBody, authenticate } = require("../midleware");

const { Product } = require("../models/productsModel.js");

const productsRouter = express.Router();

productsRouter.get(
  "/products",
  authenticate,
  ctrlWrapper(getProductsByBloodType)
);
