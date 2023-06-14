const { getConnection } = require("../database/mysql-connection.js");

const db = getConnection();

module.exports = {
    // Insertar usuario.
    async saveUser(user) {
        const statement = `
            INSERT INTO users(id, name, email, password)
            VALUES(?, ?, ?, ?)
        `;

        await db.execute(statement, [
            user.id,
            user.name,
            user.email,
            user.password,
        ]);
    },

    // Obtener los datos de un usuario por email.
    async getUserByEmail(email) {
        const statement = `
            SELECT *
            FROM users
            WHERE users.email = ?
        `;

        const [rows] = await db.execute(statement, [email]);

        return rows[0];
    },

    // Obtener los datos de un usuario por id.
    async getUserById(id) {
        const statement = `
            SELECT name, email, createdAt
            FROM users
            WHERE users.id = ?
        `;

        const [rows] = await db.execute(statement, [id]);

        return rows[0];
    },

    //Guardar Post
    async savePost(post) {
        const statement = `
        INSERT INTO posts(id,title,description,userId,place,category)
        VALUES(?,?,?,?,?,?)
        `;
        await db.execute(statement, [
            post.id,
            post.title,
            post.description,
            post.userId,
            post.place,
            post.category,
        ]);
    },

    // Obtener todos los posts
    async getAllPosts() {
        const statement = `SELECT * FROM posts ORDER BY createdAt DESC`;
        const [rows] = await db.execute(statement);
        return rows;
    },

    // datalle de un post
    async getPostById(id) {
        const statement = `SELECT * FROM posts WHERE id = ? ORDER BY createdAt DESC`;
        const [rows] = await db.execute(statement, [id]);
        return rows;
    },

    // Cambiar tittle y descripcion al nombre correspondeinte de nuestra base de datos
    async searchByTerm(searchTerm) {
        const likeTerm = `%${searchTerm}%`;
        const statement = `
      SELECT * FROM posts
      WHERE 
        place LIKE ?   
        ORDER BY createdAt DESC  
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
      category LIKE ?  
      ORDER BY createdAt DESC   
  `;
        const [rows] = await db.execute(statement, [likeCategory]);
        return rows;
    },

    //Buscar por ambas a la vez y preguntar si esta manera es la correcta o de lo contrario las de arriba individualemnte

    async searchByCategoryAndTerm(category, searchTerm) {
        const likeCategory = `%${category}%`;
        const likeTerm = `%${searchTerm}%`;
        const statement = `
    SELECT * 
    FROM posts
    WHERE category LIKE ? AND place LIKE ?
    ORDER BY createdAt DESC
  `;
        const [rows] = await db.execute(statement, [likeCategory, likeTerm]);
        return rows;
    },

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
};
