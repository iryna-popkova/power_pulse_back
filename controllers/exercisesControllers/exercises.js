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

const filterExercises = async (req, res) => {
  try {
    const { filter, name } = req.query;

    if (!filter || !name) {
      throw HttpError(400, "Filter and value parameters are required.");
    }

    let filteredExercises;

    switch (filter) {
      case "bodyPart":
        filteredExercises = await Bodyparts.find({ bodyPart: name });
        break;
      case "equipment":
        filteredExercises = await Equipments.find({ equipment: name });
        break;
      case "muscle":
        filteredExercises = await Muscles.find({ muscle: name });
        break;
      default:
        throw HttpError(400, "Invalid filter parameter.");
    }

    res.status(200).json(filteredExercises);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = { getAllExercises, filterExercises };
