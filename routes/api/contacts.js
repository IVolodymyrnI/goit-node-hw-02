const express = require("express");
const {
  getAll,
  getById,
  add,
  remove,
  put,
} = require("../../controllers/contacts");
const { validateData } = require("../../middleware/validateData");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", validateData(schemas.contacts), add);

router.delete("/:id", remove);

router.put("/:id", validateData(schemas.contacts), put);

module.exports = router;
