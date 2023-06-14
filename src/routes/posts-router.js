const { Router, json } = require("express");
const fileUpload = require("express-fileupload");

const searchPosts = require("../use-cases/posts/search-posts.js");
const viewPostDetail = require("../use-cases/posts/view-post-detail.js");
const authGuard = require("../middlewares/auth-guard.js");
const sendResponse = require("../utils/send-response.js");
const createPost = require("../use-cases/posts/create-post.js");
const toggleLike = require("../use-cases/posts/toggle-like.js");

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
router.post(
    "/posts/crear",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        await createPost(req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);

// Retorna el listado de posts. Permite filtrar por lugar o categoría.
router.get(
    "/posts",
    handleAsyncError(async (req, res) => {
        const posts = await searchPosts(req.query);
        sendResponse(res, posts);
    })
);

// Retorna un post en concreto.
router.get(
    "/posts/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        const post = await viewPostDetail(req.params.id);
        sendResponse(res, post);
    })
);

// Permite dar o quitar me gusta a un post.
// FIXME tendria que devolver el numero de like del post
router.post(
    "/posts/:id/like",
    authGuard,
    handleAsyncError(async (req, res) => {
        const post = await toggleLike(req.params.id, req.currentUser.id);
        //console.log("req.currentUser:", req.currentUser);
        sendResponse(res, post);
    })
);

module.exports = router;
