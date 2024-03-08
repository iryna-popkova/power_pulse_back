const { User, schemas } = require("./user");
const { Diary, diarySchemas } = require("./diaryModel");
const Product = require("./productsModel");
const ExerciseName = require("./exercisesName");
const Bodyparts = require("./bodyParts");
const Muscles = require("./muscles");
const Equipments = require("./equipments");

module.exports = {
  User,
  schemas,
  Diary,
  diarySchemas,
  Product,
  ExerciseName,
  Bodyparts,
  Muscles,
  Equipments,
};
