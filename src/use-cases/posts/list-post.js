const { getAllPosts } = require("../../services/db-service.js");

module.exports = async () => {
  return await getAllPosts();
};