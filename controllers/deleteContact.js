const { Contact } = require("../models/contact");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = deleteContact;
