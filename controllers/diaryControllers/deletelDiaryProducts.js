const { Diary } = require("../../models");
const mongoose = require("mongoose");
const { HttpError } = require("../../helpers");

const deleteDiaryProducts = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;

  const objExerciseId = new mongoose.Types.ObjectId(id);

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
      "addProducts._id": objExerciseId,
    },
    {
      $pull: {
        addProducts: { _id: objExerciseId },
      },
    },
    { new: true }
  ).populate("addProducts.productId");

  if (!diaryEntry) throw HttpError(404, "Product not found in diary");

  res.status(200).json({ message: "Product deleted from diary successfully" });
};

module.exports = deleteDiaryProducts;
