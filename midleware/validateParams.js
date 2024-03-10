const { HttpError } = require("../helpers/index.js");

const validateParams = (req, res, next) => {
  const { id, date } = req.params;

  if (!Number.isInteger(parseInt(id))) {
    next(HttpError(400), error.message);
  }

  if (date && !isValidDate(date)) {
    next(HttpError(400), error.message);
  }

  next();
};

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

module.exports = validateParams;
