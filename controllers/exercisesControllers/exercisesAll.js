const { Exercise } = require("../../models");

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({}, "-updatedAt");

    if (!exercises || exercises.length === 0) {
      return res.status(404).json({ message: "No exercises found" });
    }

    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllExercises;
