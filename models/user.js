const { Schema, model } = require("mongoose");
const handleMongooseError = require("../midleware/handleMongooseError");

const Joi = require("joi");

const { isBefore, differenceInYears } = require("date-fns");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name for user"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    blood: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    height: {
      type: Number,
      default: 0,
    },
    currentWeight: {
      type: Number,
      default: 0,
    },
    desiredWeight: {
      type: Number,
      default: 0,
    },
    levelActivity: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    birthday: {
      type: String,
      validate: {
        validator: function (birthday) {
          return (
            isBefore(birthday, new Date()) &&
            differenceInYears(new Date(), birthday) >= 18
          );
        },
        message: "The user must be older than 18 years",
      },
      default: "01-01-2006",
    },
    avatarURL: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    bmr: {
      type: Number,
      default: 0,
    },
    dailyRateSports: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const updateParamsSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  blood: Joi.number().valid(1, 2, 3, 4).required(),
  sex: Joi.string().valid("male", "female").required(),
  height: Joi.number().min(150).required(),
  currentWeight: Joi.number().min(35).required(),
  desiredWeight: Joi.number().min(35).required(),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required(),
  birthday: Joi.date().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateParamsSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
