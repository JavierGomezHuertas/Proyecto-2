const { generateUUID } = require("../services/crypto-service.js");
const { saveComment } = require("../services/db-service.js");

module.exports = async (postId, currentUserId, commentPayload) => {
  const post = await dbService.getPostById(postId);
  //Ver si existe el post, en caso negativo da error
  if (!post) {
    errorService.notFound();
  }

  const newComment = {
    postId,
    userId: currentUserId,
    comment: commentPayload.comment,
    id: generateUUID(),
  };

  await saveComment(newComment);
};