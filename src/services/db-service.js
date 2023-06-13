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

    // Cambiar tittle y descripcion al nombre correspondeinte de nuestra base de datos
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
};
