const express = require("express");

const { ctrlWrapper } = require("../helpers/index.js");

const { authenticate } = require("../midleware");

const { Exercise } = require("../models/exercisesModel.js");

const exerciseRouter = express.Router();

exerciseRouter.get("/", authenticate, ctrlWrapper(getAllExercises));
exerciseRouter.get("/filter", authenticate, ctrlWrapper(getAllBodyParts));
