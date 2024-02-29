const { User, schemas } = require("./user");
const { Diary, diarySchemas } = require("./diaryModel");
const UsersAnatomy = require("./usersAnatomy");
const Product = require("./productsModel");
const Filter = require("./filtersModel");
const Exercise = require("./exercisesModel");
const ProductsCategory = require("./categoriesModel");

module.exports = {
  User,
  schemas,
  Diary,
  diarySchemas,
  UsersAnatomy,
  Product,
  Filter,
  Exercise,
  ProductsCategory,
};
