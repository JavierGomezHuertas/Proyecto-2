const { generateUUID } = require("../services/crypto-service.js");
const {
  getPostById,
  likeExists,
  deleteLikeByUserId,
  createLike,
} = require("../services/db-service.js");
const errorService = require("../services/error-service.js");

module.exports = async (postId, userId) => {
  const post = await getPostById(postId);
  if (!post) {
    errorService.notFound();
  }

  if (await likeExists(postId, userId)) {
    await deleteLikeByUserId(postId, userId);
  } else {
    await createLike({
      id: generateUUID(),
      postId,
      userId,
    });
  }
};
