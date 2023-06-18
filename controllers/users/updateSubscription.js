const { Users } = require("../../models/users");
const { HttpError } = require("../../utils/HttpError");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;

  const updatedUser = await Users.findByIdAndUpdate({ _id }, body, {
    new: true,
  });

  if (!updatedUser) {
    HttpError(404, { message: "Not found!" });
  }
  const { email, subscription } = updatedUser;

  res.json({ email, subscription });
};

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
};
