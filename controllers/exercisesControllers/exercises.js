const ExerciseName = require("../../models/exercisesName");
const Bodyparts = require("../../models/bodyParts");
const Equipments = require("../../models/equipments");
const Muscles = require("../../models/muscles");
const { HttpError } = require("../../helpers");

const getAllExercises = async (req, res) => {
  try {
    const exercises = await ExerciseName.find();
    res.status(200).json(exercises);
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

const getAllFilters = async (req, res) => {
  try {
    const bodyParts = await Bodyparts.find();
    const equipments = await Equipments.find();
    const muscles = await Muscles.find();

    res.status(200).json({ bodyParts, equipments, muscles });
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = { getAllFilters, getAllExercises };
