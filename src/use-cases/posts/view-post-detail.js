const errorService = require("../../services/error-service.js");

const {
    getPostById,
    countLikesByPostId,
} = require("../../services/db-service.js");

module.exports = async (postId) => {
    const post = await getPostById(postId);
    if (post.length === 0) {
        errorService.notFound();
    }
    post[0].likes = await countLikesByPostId(postId);
    return post;
};
