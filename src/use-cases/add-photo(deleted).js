const cryptoService = require("../services/crypto-service.js");
const dbService = require("../services/db-service.js");
const errorService = require("../services/error-service.js");
const fileService = require("../services/file-service.js");

module.exports = async (postId, userId, photo) => {
  const post = await dbService.getPostById(postId);
  if (!post) {
    errorService.notFound();
  }

  if (post.userId !== userId) {
    errorService.unauthorizedUser();
  }

  const id = cryptoService.generateUUID();
  const url = await fileService.processUploadedPostPhoto(postId, id, photo);

  await dbService.savePhoto({
    id: id,
    imageURL: url,
    postId: postId,
  });
};
