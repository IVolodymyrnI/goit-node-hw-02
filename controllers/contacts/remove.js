const { Contact } = require("../../models/contact");
const { HttpError } = require("../../utils/HttpError");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");

const remove = async (req, res) => {
  const { id } = req.params;
  const respond = await Contact.findByIdAndRemove({ _id: id });

  if (!respond) {
    HttpError(404, { message: "Not found!" });
  }

  res.json({ message: "contact deleted" });
};

module.exports = {
  remove: ctrlWrapper(remove),
};
