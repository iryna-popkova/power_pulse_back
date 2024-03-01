const express = require("express");

const { ctrlWrapper } = require("../helpers/index.js");

const { authenticate } = require("../midleware");

const {
  getAllExercises,
  exercisesFilter,
} = require("../controllers/exercisesControllers");

const exerciseRouter = express.Router();

exerciseRouter.get("/", authenticate, ctrlWrapper(getAllExercises));
exerciseRouter.get("/filter", authenticate, ctrlWrapper(exercisesFilter));

module.exports = exerciseRouter;
