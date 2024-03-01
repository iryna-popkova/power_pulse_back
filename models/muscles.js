const { Schema, model } = require("mongoose");

const musclesSchema = new Schema(
  {
    filter: {
      type: String,
    },

    name: {
      type: String,
    },

    imgURL: {
      type: String,
    },
  },
  { versionKey: false }
);

const Muscles = model("muscles", musclesSchema, "filters");

module.exports = Muscles;
