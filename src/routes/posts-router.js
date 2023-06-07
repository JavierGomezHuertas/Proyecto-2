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