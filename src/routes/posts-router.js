const { Router, json } = require("express");
const fileUpload = require("express-fileupload");

const searchPosts = require("../use-cases/search-posts.js");
const authGuard = require("../middlewares/auth-guard.js");
const sendResponse = require("../utils/send-response.js");
const addComment = require("../use-cases/add-comment(deleted).js"); // Reemplazar nombre

const router = Router();
const handleAsyncError = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

//Lugar y Categoría
router.get(
    "/posts/search",
    handleAsyncError(async (req, res) => {
        const posts = await searchPosts(req.query);
        sendResponse(res, posts);
    })
);

// Comentario
router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        await addComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);

module.exports = router;
