const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const sendError = require('../utils/send-error.js');

module.exports = {
  async processUploadedPostPhoto(postId, photoId, photoFile) {
    const directory = path.join(__dirname, "../../public/photos", postId);
    await fs.mkdir(directory, { recursive: true });

    const fileName = photoId + ".webp";
    const filePath = path.join(directory, fileName);

    const sharpProcess = await sharp(photoFile);
    const metadata = await sharpProcess.metadata();

    if (metadata.width > 1080) {
      sharpProcess.resize({ width: 720 });
    }
    await sharpProcess.webp().toFile(filePath);

    const fileURL = `/photos/${postId}/${fileName}`;

    return fileURL;
  },
  async deletePhoto(dbPhoto) {
    const directory = path.join(__dirname, "../../public");
    const filePath = path.join(directory, dbPhoto.imageURL);
    await fs.unlink(filePath);
  },
  async deletePostPhotos(postId) {
    const directory = path.join(__dirname, "../../public/photos", postId);
    await fs.rm(directory, { recursive: true, force: true });
  },
};
