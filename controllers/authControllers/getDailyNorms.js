const { User } = require("../../models");
const calculateBMR = require("../../utils/calculateBMR");
const { HttpError } = require("../../helpers");

const getDailyNorms = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      throw HttpError(404, "User not found");
    }

    const { desiredWeight, height, birthday, sex, levelActivity } = user;
    const bmr = calculateBMR(
      desiredWeight,
      height,
      birthday,
      sex,
      levelActivity
    );

    const dailyRateSports = 110;

    res.status(200).json({ bmr, dailyRateSports });
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = getDailyNorms;
