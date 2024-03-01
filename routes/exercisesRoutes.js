const express = require("express");

const { authenticate } = require("../midleware");

const {
  getAllExercises,
  exercisesFilter,
} = require("../controllers/exercisesControllers");

const exerciseRouter = express.Router();

exerciseRouter.get("/", authenticate, getAllExercises);
exerciseRouter.get("/filter", authenticate, exercisesFilter);

module.exports = exerciseRouter;
