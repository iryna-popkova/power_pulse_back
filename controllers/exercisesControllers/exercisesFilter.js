const axios = require("axios");
const { Filter } = require("../../models/filtersModel");
const { UsersAnatomy } = require("../../models/usersAnatomy");

const exercisesFilter = async (req, res, next) => {
  const { filter } = req.query;

  if (!["Body parts", "Muscles", "Equipment"].includes(filter)) {
    return res.status(200).json([]);
  }

  const owner = req.user._id;
  const queryAnatomy = filter;

  let usersAnatomy = await UsersAnatomy.findOne({ owner });

  if (!usersAnatomy) {
    usersAnatomy = await UsersAnatomy.create({
      owner,
      dataAnatomy: queryAnatomy,
    });
  } else {
    usersAnatomy.dataAnatomy = queryAnatomy;
    await usersAnatomy.save();
  }

  const dataUser = await Filter.find(query).exec();

  const numberProductsBase = dataUser.length;

  res.status(200).json(dataUser);
};

module.exports = exercisesFilter;
