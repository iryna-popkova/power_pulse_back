const { Diary } = require("../../models");

const addDiaryExercises = async (req, res) => {
  const { exerciseId, date, time, calories } = req.body;
  const { id: owner } = req.user;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
      "addExercises.exerciseId": exerciseId,
      "addExercises.date": date,
    },
    {
      $inc: {
        "addExercises.$.time": +time,
        "addExercises.$.calories": +calories,
      },
    },
    { new: true }
  ).populate("addExercises.exerciseId");

  if (!diaryEntry) {
    const newDiaryEntry = await Diary.findOneAndUpdate(
      { owner, date },
      {
        $push: {
          addExercises: {
            exerciseId,
            date,
            time,
            calories,
          },
        },
      },
      { upsert: true, new: true }
    ).populate("addExercises.exerciseId");

    return res.status(200).json({
      message: "Exercise added to diary successfully",
      data: newDiaryEntry,
    });
  }

  return res.status(200).json({
    message: "Exercise updated in diary successfully",
    data: diaryEntry,
  });
};

module.exports = addDiaryExercises;
