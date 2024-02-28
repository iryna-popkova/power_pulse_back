const express = require("express");

const { ctrlWrapper } = require("../helpers/index.js");

const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require("../controllers/index.js");

const { validateBody, authenticate, upload } = require("../midleware");

const { schemas } = require("../models/user.js");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(register)
);
authRouter.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(login)
);
authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));
authRouter.post("/logout", authenticate, ctrlWrapper(logout));
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);
module.exports = authRouter;
