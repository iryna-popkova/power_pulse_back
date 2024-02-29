const { Diary } = require("../../models");

const { HttpError } = require("../../helpers");

const getDairyInfo = async (req, res) => {
  const { id: owner, bmr: caloriesIntake } = req.user;
  const { date } = req.params;

  const dataInDiary = await Diary.findOne(
    { owner, date },
    "-createdAt -updatedAt"
  )
    .populate({
      path: "addProducts.productId",
      model: "product",
    })
    .populate({
      path: "addExercises.exerciseId",
      model: "exercise",
    });

  if (!dataInDiary) throw HttpError(404, "No data found for the given date");

  const { addProducts, addExercises } = dataInDiary;

  const consumedCalories = addProducts.reduce(
    (acc, value) => acc + value.calories,
    0
  );

  const burnedCalories = addExercises.reduce(
    (acc, value) => acc + value.calories,
    0
  );

  const remainingCalories = caloriesIntake - consumedCalories;

  const timeForSports = addExercises.reduce(
    (acc, value) => acc + value.time,
    0
  );

  const remainingSports = 110 - timeForSports;

  res.status(200).json({
    caloriesIntake,
    consumedCalories,
    burnedCalories,
    remainingCalories,
    remainingSports,
    addProducts,
    addExercises,
  });
};

module.exports = getDairyInfo;
