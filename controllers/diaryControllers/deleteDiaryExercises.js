const { Diary } = require("../../models");

const { HttpError } = require("../../helpers");

const deleteDiaryExercises = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
      "addExercises._id": id,
    },
    {
      $pull: {
        addExercises: { _id: id },
      },
    },
    { new: true }
  ).populate("addExercises.exerciseId");

  if (!diaryEntry) throw HttpError(404, "Exercise not found in diary");

  res.status(200).json({ message: "Exercise deleted from diary successfully" });
};

module.exports = deleteDiaryExercises;
