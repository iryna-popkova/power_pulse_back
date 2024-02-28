const express = require("express");
const { ctrlWrapper } = require("../helpers/index.js");
const {
  validateBody,
  isValidId,
  authenticate,
} = require("../midleware/index.js");

const {
  createContactSchema,
  updataFavoriteSchema,
} = require("../models/contact.js");

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} = require("../controllers/index.js");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", authenticate, isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  ctrlWrapper(deleteContact)
);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  ctrlWrapper(createContact)
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updataFavoriteSchema),
  ctrlWrapper(updateFavorite)
);

module.exports = contactsRouter;
