const { deletePost } = require("../services/db-service.js");

module.exports = async (postId, userId) => {
  const post = await getPostById(postId);

  if (!post) {
    errorService.notFound();
  }

  if (post.userId != userId) {
    errorService.unauthorizedUser();
  }
  await deletePost(postId);
};
