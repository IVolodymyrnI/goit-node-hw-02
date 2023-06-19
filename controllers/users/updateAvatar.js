const path = require("path");
const fs = require("fs/promises");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");
const { Users } = require("../../models/users");

const publicDirPath = path.join(__dirname, "../../", "public");

async function updateAvatar(req, res) {
  try {
    const { _id } = req.user;
    const { path: tempDirPath, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;
    const newAvatarPath = path.join(publicDirPath, "avatars", fileName);
    const avatarURL = path.join("avatars", fileName);

    await fs.rename(tempDirPath, newAvatarPath);
    await Users.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
