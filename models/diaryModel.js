const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { parse, isValid, format } = require("date-fns");
const handleMongooseError = require("../midleware/handleMongooseError");
const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;

const isValidDate = (value) => {
  const parsedDate = parse(value, "dd-mm-YYYY", new Date());
  return isValid(parsedDate) && format(parsedDate, "dd-mm-YYYY") === value;
};

const diarySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: String,
      required: true,
      validate: {
        validator: isValidDate,
        message: "Invalid format. Please use this format DD-MM-YYYY.",
      },
    },
    addProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        date: {
          type: String,
          required: true,
          validate: {
            validator: isValidDate,
            message: "Invalid format. Please use this format DD-MM-YYYY.",
          },
        },
        amount: {
          type: Number,
          required: true,
          min: 1,
        },
        calories: {
          type: Number,
          required: true,
          min: 1,
        },
        _id: {
          type: Schema.Types.ObjectId,
          auto: true,
        },
      },
    ],
    addExercises: [
      {
        exerciseId: {
          type: Schema.Types.ObjectId,
          ref: "exercise",
          required: true,
        },
        date: {
          type: String,
          required: true,
          validate: {
            validator: isValidDate,
            message: "Invalid format. Please use this format DD-MM-YYYY.",
          },
        },
        time: {
          type: Number,
          required: true,
          min: 1,
        },
        calories: {
          type: Number,
          required: true,
          min: 1,
        },
        _id: {
          type: Schema.Types.ObjectId,
          auto: true,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

diarySchema.post("save", handleMongooseError);

const productsSchema = Joi.object({
  productId: Joi.string().required().empty(false).messages({
    "any.required": "Missing required productId field",
  }),
  date: Joi.string().pattern(dateRegex).required().empty(false).messages({
    "any.required": "Missing required date field",
    "string.pattern.base":
      "Invalid date format. Please use the format DD-MM-YYYY.",
  }),
  amount: Joi.number().min(1).required().empty(false).messages({
    "any.required": "Missing required amount field",
    "number.min": "Amount must be a number greater than 1",
  }),
  calories: Joi.number().min(1).required().empty(false).messages({
    "any.required": "Missing required calories field",
    "number.min": "Calories must be a number greater than 1",
  }),
});

const exercisesSchema = Joi.object({
  exerciseId: Joi.string().required().empty(false).messages({
    "any.required": "Missing required exerciseId field",
  }),
  date: Joi.string().pattern(dateRegex).required().empty(false).messages({
    "any.required": "Missing required date field",
    "string.pattern.base":
      "Invalid date format. Please use the format DD-MM-YYYY.",
  }),
  time: Joi.number().min(1).required().empty(false).messages({
    "any.required": "Missing required time field",
    "number.min": "Time must be a number greater than or equal to 1",
  }),
  calories: Joi.number().min(1).required().empty(false).messages({
    "any.required": "Missing required calories field",
    "number.min": "Calories must be a number greater than or equal to 1",
  }),
});

const diarySchemas = {
  productsSchema,
  exercisesSchema,
};

const Diary = model("diary", diarySchema);

module.exports = { Diary, diarySchemas };
