const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      next(HttpError(400, errorMessage));
    } else {
      next();
    }
  };

  return func;
};

module.exports = validateBody;
