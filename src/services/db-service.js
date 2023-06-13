const { getConnection } = require("../database/mysql-connection.js");

const db = getConnection();

module.exports = {
    //cambiar tittle y descripcion al nombre correspondeinte de nuestra base de datos

    async searchByTerm(searchTerm) {
        const likeTerm = `%${searchTerm}%`;
        const statement = `
      SELECT * FROM posts
      WHERE 
        lugar LIKE ?     
    `;
        const [rows] = await db.execute(statement, [likeTerm]);
        return rows;
    },

    //Buscar por categoria

    async searchByCategory(category) {
        const likeCategory = `%${category}%`;
        const statement = `
    SELECT * FROM posts
    WHERE 
      categoria LIKE ?     
  `;
        const [rows] = await db.execute(statement, [likeCategory]);
        return rows;
    },

    //Buscar por ambas a la vez y preguntar si esta manera es la correcta o de lo contrario las de arriba individualemnte

    async searchByCategoryAndTerm(category, searchTerm) {
        const likeCategory = `%${category}%`;
        const likeTerm = `%${searchTerm}%`;
        const statement = `
    SELECT * FROM posts
    WHERE 
      categoria LIKE ?     
      AND lugar LIKE ?
  `;
        const [rows] = await db.execute(statement, [likeCategory, likeTerm]);
        return rows;
    },

    //Para crear un comentario y guardarlo (esta parte es opcional)

    /*
async saveComment(postComment) {
  const statement = `
  INSERT INTO post_comments(id,userId,postId,comment)
  VALUES(?,?,?,?)
  `;
  await db.execute(statement, [
    postComment.id,
    postComment.userId,
    postComment.postId,
    postComment.comment,
  ]);
},
*/
};
