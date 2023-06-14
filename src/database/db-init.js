require("dotenv").config();
const cryptoService = require("../services/crypto-service.js");
const { createPool } = require("./mysql-connection.js");
const { faker } = require("@faker-js/faker");
const sendError = require("../utils/send-error.js");

const DATABASE_NAME = process.env.MYSQL_DATABASE;

const initDB = async () => {
    const pool = createPool();
    //BORRAR LA BASE DE DATOS SI EXISTE
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);

    //CREAR LA BASE DE DATOS
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    await pool.query(`USE ${DATABASE_NAME}`);

    //CREAR LA TABLA DE USUARIOS
    await createDatabaseTables(pool);

    await generateFakeData(pool);

    await pool.end();
};

async function createDatabaseTables(pool) {
    await pool.query(`
        CREATE TABLE users(
            id CHAR(36) PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            password VARCHAR(150) NOT NULL
        )
    `);

    await pool.query(`
        CREATE TABLE posts(
            id CHAR(36) PRIMARY KEY,
            title VARCHAR(150) NOT NULL,
            description TEXT NOT NULL,
            userId CHAR(36) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            place VARCHAR (50) NOT NULL,
            photo VARCHAR (100),
            subget VARCHAR (100),
            category ENUM ("rural", "gastronomico", "naturaleza") NOT NULL,  
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        )
    `);

    await pool.query(`
        CREATE TABLE post_likes(
            id CHAR(36) PRIMARY KEY,
            userId CHAR(36) NOT NULL,
            postId CHAR(36) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
        )
    `);
}

async function generateFakeData(pool) {
    const [users, posts] = await generateUsersAndPosts();

    for (const user of users) {
        await pool.execute(
            `
        INSERT INTO users(id,name,email,password)
        VALUES(?,?,?,?)
      `,
            [user.id, user.name, user.email, user.password].filter((param) => param !== undefined)
        );
    }

    for (const post of posts) {
        await pool.execute(
            `
          INSERT INTO posts(id, title, description, place, category, userId)
          VALUES(?, ?, ?, ?, ?, ?)
        `,
            [
                post.id,
                post.title,
                post.description,
                post.place,
                post.category,
                post.userId,
            ].filter((param) => param !== undefined)
        );

        const likes = generateLikes(post, users);

        for (const like of likes) {
            await pool.execute(
                `
            INSERT INTO post_likes(id,userId,postId)
            VALUES(?,?,?)
          `,
                [like.id, like.userId, like.postId].filter((param) => param !== undefined)
            );
        }
    }

    console.log("Tablas creadas");
}

async function generateUsersAndPosts() {
    const users = [];
    const posts = [];
    const numUsers = Math.floor(Math.random() * 15) + 1;

    for (let i = 0; i < numUsers; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const user = {
            id: cryptoService.generateUUID(),
            name: firstName + " " + lastName,
            email: faker.internet.email({
                firstName: firstName,
                lastName: lastName,
            }),
            password: await cryptoService.hashPassword(
                faker.internet.password()
            ),
            posts: [],
        };

        const numPostsPerUser = Math.floor(Math.random() * 5) + 1;
        const categories = ["rural", "gastronomico", "naturaleza"];

        for (let j = 0; j < numPostsPerUser; j++) {
            const numCategory = Math.floor(Math.random() * 3);
            const post = {
                id: cryptoService.generateUUID(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraphs(),
                userId: user.id,
                place: "Madrid",
                category: categories[numCategory],
            };
            posts.push(post);
        }

        users.push(user);
    }

    return [users, posts];
}

function generateLikes(post, users) {
    const numLikes = Math.floor(Math.random() * users.length) + 1;
    const likes = [];
    const remainingUsers = [...users];

    for (let i = 0; i < numLikes; i++) {
        const userIndex = Math.floor(Math.random() * remainingUsers.length);
        const user = remainingUsers[userIndex];
        remainingUsers.splice(userIndex, 1);

        const like = {
            id: cryptoService.generateUUID(),
            userId: user.id,
            postId: post.id,
        };
        likes.push(like);
    }

    return likes;
}

initDB();
