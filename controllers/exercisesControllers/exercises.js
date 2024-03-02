// const { HttpError } = require("../../helpers");

// const {
//   ExerciseName,

//   Bodyparts,
//   Muscles,
//   Equipments,
// } = require("../../models");

// const getAllExercisesName = async (req, res) => {
//   const result = await ExerciseName.find();
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const getAllBodyParts = async (req, res) => {
//   const result = await Bodyparts.find({
//     filter: "Body parts",
//   });

//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const getAllMuscles = async (req, res) => {
//   const result = await Muscles.find({ filter: "Muscles" });

//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const getAllEquipments = async (req, res) => {
//   const result = await Equipments.find({
//     filter: "Equipment",
//   });

//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// module.exports = {
//   getAllExercisesName,
//   getAllBodyParts,
//   getAllMuscles,
//   getAllEquipments,
// };

const ExerciseName = require("../../models/exercisesName");
const Bodyparts = require("../../models/bodyParts");
const Equipments = require("../../models/equipments");
const Muscles = require("../../models/muscles");

const getAllExercises = async (req, res) => {
  try {
    const exercises = await ExerciseName.find();
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error retrieving exercises:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllFilters = async (req, res) => {
  try {
    const bodyParts = await Bodyparts.find();
    const equipments = await Equipments.find();
    const muscles = await Muscles.find();

    res.status(200).json({ bodyParts, equipments, muscles });
  } catch (error) {
    console.error("Error retrieving filters:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllFilters, getAllExercises };
