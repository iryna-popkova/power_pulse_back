const { Schema, model } = require("mongoose");

const filtersSchema = new Schema({
  filter: {
    type: String,
  },
  name: {
    type: String,
  },
  imgURL: {
    type: String,
  },
});

const Filter = model("filter", filtersSchema);
module.exports = { Filter };
