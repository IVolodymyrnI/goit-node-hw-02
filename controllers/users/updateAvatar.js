const path = require("node:path");
const fs = require("fs/promises");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");
const { Users } = require("../../models/users");

const publicDir = path.join(__dirname, "../../", "public");

async function updateAvatar(req, res) {
  try {
    console.log(req.file);
    const { _id } = req.user;
    const { path: originalPath, originalName } = req.file;
    const fileName = `${_id}_${originalName}`;
    const avatarURL = path.join(publicDir, fileName);
    await fs.rename(originalPath, avatarURL);
    await Users.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
