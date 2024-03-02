const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const updateUserParams = require("./updateUserParams");
const getDailyNorms = require("./getDailyNorms");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  updateUserParams,
  getDailyNorms,
};
