const { Schema, model } = require("mongoose");

const usersAnatomySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    dataAnatomy: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UsersAnatomy = model("usersAnatomy", usersAnatomySchema);
module.exports = { UsersAnatomy };
