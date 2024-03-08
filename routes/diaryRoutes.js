const express = require("express");
const { validateBody, authenticate, validateParams } = require("../midleware");
const { ctrlWrapper } = require("../helpers");
const { diarySchemas } = require("../models");
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
  validateBody(diarySchemas.productsSchema),
  ctrlWrapper(addDiaryProducts)
);

diaryRouter.post(
  "/exercises",
  authenticate,
  validateBody(diarySchemas.exercisesSchema),
  ctrlWrapper(addDiaryExercises)
);

diaryRouter.delete(
  "/products/:id",
  authenticate,
  validateParams,
  ctrlWrapper(deleteDiaryProducts)
);

diaryRouter.delete(
  "/exercises/:id",
  authenticate,
  validateParams,
  ctrlWrapper(deleteDiaryExercises)
);

diaryRouter.get("/:date", authenticate, ctrlWrapper(getDiaryInfo));

module.exports = diaryRouter;
