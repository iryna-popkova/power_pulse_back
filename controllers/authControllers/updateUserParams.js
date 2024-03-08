const { User } = require("../../models");
const calculateBMR = require("../../utils/calculateBMR");
const { HttpError } = require("../../helpers");

const updateUserParams = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      throw HttpError(404, "User not found");
    }

    updatedUser.dailyRateSports = 110;

    const { desiredWeight, height, birthday, sex, levelActivity } = updatedUser;
    const bmr = calculateBMR(
      desiredWeight,
      height,
      birthday,
      sex,
      levelActivity
    );
    updatedUser.bmr = bmr;

    await updatedUser.save();
    console.log(updatedUser);

    res.status(200).json({
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        blood: updatedUser.blood,
        sex: updatedUser.sex,
        height: updatedUser.height,
        currentWeight: updatedUser.currentWeight,
        desiredWeight: updatedUser.desiredWeight,
        birthday: updatedUser.birthday,
        levelActivity: updatedUser.levelActivity,
        avatarURL: updatedUser.avatarURL,
      },
      bmr,
      dailyRateSports: updatedUser.dailyRateSports,
    });
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = updateUserParams;
