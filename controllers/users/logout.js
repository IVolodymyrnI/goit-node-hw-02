const { Users } = require("../../models/users");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");

async function logout(req, res) {
  const { _id: id } = req.user;
  await Users.findByIdAndUpdate(id, { token: "" });

  res.status(204).json();
}

module.exports = {
  logout: ctrlWrapper(logout),
};
