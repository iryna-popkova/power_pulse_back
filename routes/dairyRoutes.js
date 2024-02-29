const express = require("express");
const { validateBody, authenticate } = require("../midleware");
const { ctrlWrapper } = require("../helpers");
const { diarySchemas } = require("../models");
const {
  addDiaryProducts,
  addDiaryExercises,
  deleteDiaryProducts,
  deleteDiaryExercises,
  getDiaryInfo,
} = require("../controllers/diaryControllers");

const dairyRouter = express.Router();

dairyRouter.post(
  "/products",
  authenticate,
  validateBody(diarySchemas.productsSchema),
  ctrlWrapper(addDiaryProducts)
);

dairyRouter.post(
  "/exercises",
  authenticate,
  validateBody(diarySchemas.exercisesSchema),
  ctrlWrapper(addDiaryExercises)
);

dairyRouter.delete(
  "/products/:id",
  authenticate,
  ctrlWrapper(deleteDiaryProducts)
);

dairyRouter.delete(
  "/exercises/:id",
  authenticate,
  ctrlWrapper(deleteDiaryExercises)
);

dairyRouter.get("/:date", authenticate, ctrlWrapper(getDiaryInfo));

module.exports = dairyRouter;
