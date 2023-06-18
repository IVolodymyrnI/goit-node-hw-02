const { Contact } = require("../../models/contact");
const { HttpError } = require("../../utils/HttpError");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");

const getById = async (req, res) => {
  const { id } = req.params;
  const respond = await Contact.findById(id);

  if (!respond) {
    HttpError(404, { message: "Not found!" });
  }

  res.json(respond);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
