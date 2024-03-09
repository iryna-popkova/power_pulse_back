const { User, schemas } = require("./user");
const { Diary, diarySchemas } = require("./diaryModel");
const Product = require("./productsModel");
const ExerciseName = require("./exercisesName");
const Filter = require("./filtersModel");

module.exports = {
  User,
  schemas,
  Diary,
  diarySchemas,
  Product,
  ExerciseName,
  Filter,
};
