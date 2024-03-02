const express = require("express");

const { ctrlWrapper } = require("../helpers");

const {
  register,
  login,
  logout,
  updateAvatar,
  getCurrent,
  getDailyNorms,
  updateUserParams,
} = require("../controllers/authControllers");

const { validateBody, authenticate, upload } = require("../midleware");

const { schemas } = require("../models");

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
authRouter.patch(
  "/params",
  authenticate,
  validateBody(schemas.updateParamsSchema),
  ctrlWrapper(updateUserParams)
);
authRouter.get("/dailyNorms", authenticate, ctrlWrapper(getDailyNorms));
authRouter.post("/logout", authenticate, ctrlWrapper(logout));
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = authRouter;
