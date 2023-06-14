const { generateUUID } = require("../../services/crypto-service.js");
const { savePost } = require("../../services/db-service.js");

module.exports = async (currentUserId, postPayload) => {
  console.log(currentUserId); 
    
  const newPost = {
    id: generateUUID(),
    title: postPayload.title,
    description: postPayload.description,
    userId: currentUserId,
    place: postPayload.place,
    category: postPayload.category,
  };

  await savePost(newPost);
};
