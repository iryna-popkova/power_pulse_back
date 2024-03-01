const express = require("express");

const exerciseRouter = express.Router();

const { authenticate } = require("../midleware");

const ctrl = require("../controllers/exercisesControllers");

exerciseRouter.get("/", authenticate, ctrl.getAllExercisesName);

exerciseRouter.get("/bodyparts", authenticate, ctrl.getAllBodyParts);

exerciseRouter.get("/muscles", authenticate, ctrl.getAllMuscles);

exerciseRouter.get("/equipments", authenticate, ctrl.getAllEquipments);

module.exports = exerciseRouter;
