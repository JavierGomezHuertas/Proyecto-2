const {
  getPostById,
  getCommentsByPostId,
  countLikesByPostId,
  getPhotosByPostId,
} = require("../services/db-service.js");

module.exports = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    errorService.notFound();
  }
  post.comments = await getCommentsByPostId(postId);
  post.photos = await getPhotosByPostId(postId);
  post.likes = await countLikesByPostId(postId);
  return post;
};
