const ExerciseName = require("../../models/exercisesName");
const { Filter } = require("../../models/filtersModel");
const { HttpError } = require("../../helpers");

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Filter.find();
    res.status(200).json(exercises);
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
        filteredExercises = await ExerciseName.find({ bodyPart: name });
        break;
      case "equipment":
        filteredExercises = await ExerciseName.find({ equipment: name });
        break;
      case "target":
        filteredExercises = await ExerciseName.find({ target: name });
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
