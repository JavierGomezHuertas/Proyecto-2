const { Router, json } = require("express");
const fileUpload = require("express-fileupload");

const searchPosts = require("../use-cases/search-posts.js");

const router = Router();


//Ruta para buscar por lugar y categoría

router.get(
    "/posts/search",
    handleAsyncError(async (req, res) => {
      const posts = await searchPosts(req.query);
      sendResponse(res, posts);
    })
  );


//Ruta para agregar un comentario

router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
      await addComment(req.params.id, req.currentUser.id, req.body);
      sendResponse(res, undefined, 201);
    })
  );


//Ver detalles del post buscado por id

  router.get(
    "/posts/:id",
    handleAsyncError(async (req, res) => {
      const post = await viewPostDetail(req.params.id);
      sendResponse(res, post);
    })
  );


//Borrar recomendacion (post) a través del id

  router.delete(
    "/posts/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
      await removePost(req.params.id, req.currentUser.id);
      sendResponse(res);
    })
  );



//Dar like a un comentario

router.post(
    "/posts/:id/like",
    authGuard,
    handleAsyncError(async (req, res) => {
      //Hacer toggle del like en el post con id req.params.id
      await toggleLike(req.params.id, req.currentUser.id);
      sendResponse(res);
    })
);