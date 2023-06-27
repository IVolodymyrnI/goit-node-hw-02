const { Users } = require("../../models/users");
const { HttpError } = require("../../utils/HttpError");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");

async function verifyToken(req, res) {
  const { verificationToken } = req.params;
  const user = await Users.findOne({ verificationToken });
  if (user.verificationToken !== verificationToken) {
    HttpError(401, "User not found");
  }

  await Users.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({ message: "Verification successful" });
}

module.exports = {
  verifyToken: ctrlWrapper(verifyToken),
};
