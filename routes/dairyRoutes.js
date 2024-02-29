const express = require("express");
const { validateBody, authenticate } = require("../midleware");
const { ctrlWrapper } = require("../helpers");
const { schemas } = require("../models");
const {
  addDiaryProducts,
  addDiaryExercises,
  deleteDiaryProducts,
  deleteDiaryExercises,
  getDiaryInfo,
} = require("../controllers/diaryControllers");

const diaryRouter = express.Router();

diaryRouter.post(
  "/products",
  authenticate,
  validateBody(schemas.productsSchema),
  ctrlWrapper(addDiaryProducts)
);

diaryRouter.post(
  "/exercises",
  authenticate,
  validateBody(schemas.exercisesSchema),
  ctrlWrapper(addDiaryExercises)
);

diaryRouter.delete(
  "/products/:id",
  authenticate,
  ctrlWrapper(deleteDiaryProducts)
);

diaryRouter.delete(
  "/exercises/:id",
  authenticate,
  ctrlWrapper(deleteDiaryExercises)
);

diaryRouter.get("/:date", authenticate, ctrlWrapper(getDiaryInfo));

module.exports = diaryRouter;
