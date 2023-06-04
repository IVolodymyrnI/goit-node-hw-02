const { Contact } = require("../models/contact");
const { HttpError } = require("../utils/HttpError");
const { ctrlWrapper } = require("../utils/ctrlWrapper");

const getAll = async (_, res) => {
  const respond = await Contact.find();

  res.json(respond);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const respond = await Contact.findById(id);

  if (!respond) {
    HttpError(404, { message: "Not found!" });
  }

  res.json(respond);
};

const add = async (req, res) => {
  const body = req.body;
  const respond = await Contact.create(body);

  res.status(201).json(respond);
};

const put = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const respond = await Contact.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });

  if (!respond) {
    HttpError(404, { message: "Not found!" });
  }

  res.json(respond);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const respond = await Contact.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });

  if (!respond) {
    HttpError(404, { message: "Not found!" });
  }

  res.json(respond);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const respond = await Contact.findByIdAndRemove({ _id: id });

  if (!respond) {
    HttpError(404, { message: "Not found!" });
  }

  res.json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  put: ctrlWrapper(put),
  updateFavorite: ctrlWrapper(updateFavorite),
  remove: ctrlWrapper(remove),
};
