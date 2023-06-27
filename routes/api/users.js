const express = require("express");

const { validateData } = require("../../middleware/validateData");
const { schemas } = require("../../models/users");
const {
  register,
  login,
  current,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/users/index");
const authenticate = require("../../middleware/authenticate");
const upload = require("../../middleware/upload");

const router = express.Router();

router.post("/users/signup", validateData(schemas.usersRegister), register);
router.post("/users/login", validateData(schemas.usersLogin), login);
router.post("/users/current", authenticate, current);
router.post("/users/logout", authenticate, logout);
router.patch(
  "/users/avatar",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

router.patch(
  "/users",
  authenticate,
  validateData(schemas.updateSubscription),
  updateSubscription
);

module.exports = router;
