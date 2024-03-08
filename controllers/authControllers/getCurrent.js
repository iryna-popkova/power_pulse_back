const { HttpError } = require("../../helpers");

const getCurrent = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw HttpError(404, "User not found");
    }

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        blood: user.blood,
        sex: user.sex,
        height: user.height,
        currentWeight: user.currentWeight,
        desiredWeight: user.desiredWeight,
        levelActivity: user.levelActivity,
        avatarURL: user.avatarURL,
        birthday: user.birthday,
        createdAt: user.createdAt,
      },
      bmr: user.bmr,
      dailyRateSports: user.dailyRateSports,
      token: user.token,
    });
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = getCurrent;
