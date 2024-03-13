const { HttpError } = require("../helpers");

// const validateBody = (schema) => {
//   const func = (req, _, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       next(HttpError(400), error.message);
//     }
//     next();
//   };

//   return func;
// };

// module.exports = validateBody;

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // Extract error messages from the Joi validation error object
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      // Pass error message to HttpError constructor along with status code
      next(HttpError(400, errorMessage));
    } else {
      // If no error, proceed to the next middleware
      next();
    }
  };

  return func;
};

module.exports = validateBody;
