const { Router } = require("express");
const router = Router();

const userRouter = require("./user-router");
const postRouter = require("./posts-router");

router.use(userRouter);
router.use(postRouter);

module.exports = router;
