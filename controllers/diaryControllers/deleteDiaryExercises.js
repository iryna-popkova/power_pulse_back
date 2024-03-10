const { Diary } = require("../../models");
const mongoose = require("mongoose");
const { HttpError } = require("../../helpers");

const deleteDiaryExercises = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;

  const objExerciseId = new mongoose.Types.ObjectId(id);

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
      "addExercises._id": objExerciseId,
    },
    {
      $pull: {
        addExercises: { _id: objExerciseId },
      },
    },
    { new: true }
  ).populate("addExercises.exerciseId");
  if (!diaryEntry) throw HttpError(404, "Exercise not found in diary");

  res.status(200).json({ message: "Exercise deleted from diary successfully" });
};

module.exports = deleteDiaryExercises;
