const { User, schemas } = require("./user");
const { Diary, diarySchemas } = require("./diaryModel");
const Product = require("./productsModel");
const Filter = require("./filtersModel");
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
  Filter,
  ExerciseName,
  Bodyparts,
  Muscles,
  Equipments,
};
