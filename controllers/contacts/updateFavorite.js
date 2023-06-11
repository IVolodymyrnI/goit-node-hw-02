const { Contact } = require("../../models/contact");
const { HttpError } = require("../../utils/HttpError");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");

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

module.exports = {
  updateFavorite: ctrlWrapper(updateFavorite),
};
