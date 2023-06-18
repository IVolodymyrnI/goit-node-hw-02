const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const respond = await Contact.find(
    { owner, favorite: favorite || { $exists: true } },
    null,
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");

  res.json(respond);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
