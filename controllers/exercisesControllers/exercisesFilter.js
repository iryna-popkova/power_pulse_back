const Exercise = require("../../models");

const exercisesFilter = async (req, res) => {
  try {
    const exerciseTypes = await Exercise.find().distinct("bodyPart");
    res.status(200).json({ exerciseTypes });
  } catch (error) {
    console.error("Error fetching exercise types:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = exercisesFilter;
