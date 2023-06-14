const dbService = require("../../services/db-service.js");

module.exports = async ({lugar, categoria}) => {
  // FIXME falta join para sacar numero like, nombre/email usuario del post
  let posts;
  if(lugar && categoria){
    posts = await dbService.searchByCategoryAndTerm(categoria, lugar);
  }else if(lugar) {
    posts = await dbService.searchByTerm(lugar);
  }else if(categoria) {
    posts = await dbService.searchByCategory(categoria);
  } else {
    posts = await dbService.getAllPosts();
  }
  return posts;
};
