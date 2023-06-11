const { ctrlWrapper } = require("../../utils/ctrlWrapper");

function current(req, res) {
  const { subscription, email } = req.user;

  res.json({ email, subscription });
}

module.exports = {
  current: ctrlWrapper(current),
};
