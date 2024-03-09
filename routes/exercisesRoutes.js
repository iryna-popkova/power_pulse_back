const express = require("express");

const exerciseRouter = express.Router();

const { authenticate } = require("../midleware");
const {
  getAllExercises,
  filterExercises,
} = require("../controllers/exercisesControllers");

exerciseRouter.get("/", authenticate, getAllExercises);
exerciseRouter.get("/filters", authenticate, filterExercises);

module.exports = exerciseRouter;
