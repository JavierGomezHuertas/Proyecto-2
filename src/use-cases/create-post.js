const { generateUUID } = require("../services/crypto-service.js");
const { savePost } = require("../services/db-service.js");

module.exports = async (currentUserId, postPayload) => {
  const newPost = {
    id: generateUUID(),
    title: postPayload.title,
    description: postPayload.description,
    userId: currentUserId,
  };

  await savePost(newPost);
};
