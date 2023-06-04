const express = require("express");
const {
  getAll,
  getById,
  add,
  remove,
  put,
  updateFavorite,
} = require("../../controllers/contacts");
const { validateData } = require("../../middleware/validateData");
const { schemas } = require("../../models/contact");
const isValidId = require("../../middleware/isValidId");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post("/", validateData(schemas.contacts), add);

router.delete("/:id", isValidId, remove);

router.put("/:id", isValidId, validateData(schemas.contacts), put);

router.patch(
  "/:id/favorite",
  isValidId,
  validateData(schemas.updateFavorite),
  updateFavorite
);

module.exports = router;
