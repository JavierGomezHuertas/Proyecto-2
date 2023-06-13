const { Router, json } = require("express");
const router = Router();
const postRouter = require("./posts-router");

router.use(postRouter);

module.exports = router;