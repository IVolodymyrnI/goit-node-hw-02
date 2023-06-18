const { add } = require("./add");
const { getById } = require("./getById");
const { put } = require("./put");
const { remove } = require("./remove");
const { getAll } = require("./getAll");
const { updateFavorite } = require("./updateFavorite");

module.exports = {
  add,
  getAll,
  getById,
  remove,
  put,
  updateFavorite,
};
