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
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

diarySchema.post("save", handleMongooseError);

const productsSchema = Joi.object({
  productId: Joi.string().required(),
  date: Joi.string().pattern(dateRegex).required(),
  amount: Joi.number().min(1).required(),
  calories: Joi.number().min(1).required(),
});

const exercisesSchema = Joi.object({
  exerciseId: Joi.string().required(),
  date: Joi.string().pattern(dateRegex).required(),
  time: Joi.number().min(1).required(),
  calories: Joi.number().min(1).required(),
});

const diarySchemas = {
  productsSchema,
  exercisesSchema,
};

const Diary = model("diary", diarySchema);

module.exports = { Diary, diarySchemas };
