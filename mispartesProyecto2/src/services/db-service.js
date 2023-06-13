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


//Para crear un comentario y guardarlo

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


//Ver detalles de un post filtrado por el id

async getPostById(postId) {
  const statement = `
    SELECT *
    FROM posts as p
    WHERE p.id = ?
  `;
  const [rows] = await db.execute(statement, [postId]);

  return rows[0];
},


//Borrar post

async deletePost(postId) {
  const statement = `
  DELETE FROM posts
  WHERE id = ?
  `;
  await db.execute(statement, [postId]);
},



//Crea like de un post (Recomendación)

async createLike(like) {
  const statement = `
  INSERT INTO post_likes(id,userId,postId)
  VALUES(?,?,?)
  `;
  await db.execute(statement, [like.id, like.userId, like.postId]);
},



async likeExists(postId, userId) {
  const statement = `
  SELECT * FROM post_likes
  WHERE postId = ? and userId = ?
  `;
  const [rows] = await db.execute(statement, [postId, userId]);
  return !!rows[0];
},




async deleteLikeByUserId(postId, userId) {
  const statement = `
  DELETE FROM post_likes
  WHERE postId = ? and userId = ?
  `;
  await db.execute(statement, [postId, userId]);
},




async countLikesByPostId(postId) {
  const statement = `
  SELECT COUNT(*) as likes FROM post_likes
  WHERE postId = ?
  `;
  const [rows] = await db.execute(statement, [postId]);
  return rows[0].likes;
},




async countCommentsByPostId(postId) {
  const statement = `
  SELECT COUNT(*) as comments FROM post_comments
  WHERE postId = ?
  `;
  const [rows] = await db.execute(statement, [postId]);
  return rows[0].comments;
},



};



