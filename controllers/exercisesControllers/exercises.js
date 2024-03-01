const { HttpError } = require("../../helpers");

const {
  ExerciseName,

  Bodyparts,
  Muscles,
  Equipments,
} = require("../../models");

const getAllExercisesName = async (req, res) => {
  const result = await ExerciseName.find();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getAllBodyParts = async (req, res) => {
  const result = await Bodyparts.find({
    filter: "Body parts",
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getAllMuscles = async (req, res) => {
  const result = await Muscles.find({ filter: "Muscles" });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getAllEquipments = async (req, res) => {
  const result = await Equipments.find({
    filter: "Equipment",
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAllExercisesName,
  getAllBodyParts,
  getAllMuscles,
  getAllEquipments,
};
