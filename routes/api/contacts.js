const express = require("express");
const {
  getAll,
  getById,
  add,
  remove,
  put,
  updateFavorite,
} = require("../../controllers/contacts/index");
const { validateData } = require("../../middleware/validateData");
const { schemas } = require("../../models/contact");
const isValidId = require("../../middleware/isValidId");
const authenticate = require("../../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, isValidId, getById);

router.post("/", authenticate, validateData(schemas.contacts), add);

router.delete("/:id", authenticate, isValidId, remove);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateData(schemas.contacts),
  put
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateData(schemas.updateFavorite),
  updateFavorite
);

module.exports = router;
