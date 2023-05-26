const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  replaceContact,
} = require("../models/contacts");
const { HttpError } = require("../utils/HttpError");
const { ctrlWrapper } = require("../utils/ctrlWrapper");

const getAll = async (_, res) => {
  const respond = await listContacts();

  res.json(respond);
};

const getById = async (req, res) => {
  const id = req.params.contactId;
  const respond = await getContactById(id);

  if (!respond) {
    HttpError(404, "Not found!");
  }

  res.json(respond);
};

const add = async (req, res) => {
  const body = req.body;
  const respond = await addContact(body);

  res.status(201).json(respond);
};

const put = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;
  const respond = await replaceContact(id, body);

  if (!respond) {
    HttpError(404, "Not found!");
  }

  res.json(respond);
};

const remove = async (req, res) => {
  const id = req.params.contactId;
  const respond = await removeContact(id);

  if (!respond) {
    HttpError(404, "Not found!");
  }

  res.status(204).send();
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  put: ctrlWrapper(put),
  remove: ctrlWrapper(remove),
};
