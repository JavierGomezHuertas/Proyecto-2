const dbService = require("../services/db-service.js");

module.exports = async ({ search }) => {
  const posts = await dbService.searchByTerm(search);
  return posts;
};

module.exports = async ({ search }) => {
  const posts = await dbService.searchByCategory(search);
  return posts;
};


//Preguntar al profesor de que manera es la correcta para hacer los search

module.exports = async ({ category, searchTerm }) => {
  const posts = await dbService.searchByCategoryAndTerm(category, searchTerm);
  return posts;
};