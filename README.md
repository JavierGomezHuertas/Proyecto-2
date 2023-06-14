# Viajes recomendados

​
Aplicación que permite gestionar un portal donde los usuarios puedan publicar recomendaciones de viajes o experiencias poco conocidas.

## Instalar

-   Crear una base de datos vacía en una instancia de MySQL local.
    ​
-   Instalar las dependencias mediante el comando `npm install` o `npm i`.
    ​
-   Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
    ​
-   Ejecutar `npm run initDB` para crear las tablas necesarias en la base de datos.
    ​
-   Ejecutar `npm run dev` para lanzar el servidor.
    ​

## Base de datos

-   **`users:`** id, name, email, password, createdAt.
    ​
-   **`posts:`** id, title, place, description, lead, category, photo, userId, createdAt.
    ​
-   **`post_likes:`** id, userId, postId, createdAt.

## Endpoints de los usuarios

-   **POST** - [`/users/register`] - Crea un usuario.
-   **POST** - [`/users/login`] - Logea a un usuario retornando un token.
-   **GET** - [`/users`] - Retorna información del usuario del token. ➡️ `Token`

## Endpoints de los post

-   **POST** - [`/posts`] - Crea nuevo post. ➡️ `Token`
-   **GET** - [`/posts`] - Retorna el listado de posts. Permite filtrar por lugar o categoría.
-   **GET** - [`/posts/:id`] - Retorna un post en concreto.
-   **POST** - [`/posts/:id/like`] - Permite dar o quitar me gusta a un post. ➡️ `Token`
