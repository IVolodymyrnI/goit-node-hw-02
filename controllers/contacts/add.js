const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");

const add = async (req, res) => {
  const body = req.body;
  const { _id: owner } = req.user;
  const respond = await Contact.create({ ...body, owner });

  res.status(201).json(respond);
};
module.exports = {
  add: ctrlWrapper(add),
};
