const { Diary } = require("../../models");

const { HttpError } = require("../../helpers");

const deleteDiaryProducts = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
      "addProducts._id": id,
    },
    {
      $pull: {
        addProducts: { _id: id },
      },
    },
    { new: true }
  ).populate("addProducts.productId");

  if (!diaryEntry) throw HttpError(404, "Product not found in diary");

  res.status(200).json({ message: "Product deleted from diary successfully" });
};

module.exports = deleteDiaryProducts;
