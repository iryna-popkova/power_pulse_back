const { User, schemas } = require("./user");
const { Diary, diarySchemas } = require("./diaryModel");
const Product = require("./productsModel");
const Filter = require("./filtersModel");
const Exercise = require("./exercisesModel");

module.exports = {
  User,
  schemas,
  Diary,
  diarySchemas,
  Product,
  Filter,
  Exercise,
};
