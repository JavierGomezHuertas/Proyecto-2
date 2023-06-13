const { Router, json } = require("express");
const fileUpload = require("express-fileupload");

const searchPosts = require("../use-cases/posts/search-posts.js");
const authGuard = require("../middlewares/auth-guard.js");
const sendResponse = require("../utils/send-response.js");

const router = Router();

const handleAsyncError = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

/**
 * #####################
 * ## Endpoints Posts ##
 * #####################
 */

// Crear nuevo post.
router.post("/posts");

// Retorna el listado de posts. Permite filtrar por lugar o categoría.
router.get("/posts");

// Retorna un post en concreto.
router.get("/posts/:id");

// Permite dar me gusta a un post.
router.post("/posts/:id/like");

// Permite eliminar un me gusta a un post.
router.delete("/posts/:id/like");

module.exports = router;