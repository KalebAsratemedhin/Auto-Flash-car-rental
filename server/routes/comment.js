
const express = require("express");
const router = express.Router();
const {addComment, getCommentsByCar, deleteComment} = require("../controllers/comment");
const {authenticateUser} = require("../middleware/auth");

router.post("/", authenticateUser, addComment);
router.get("/:carId", getCommentsByCar);
router.delete("/:commentId", authenticateUser, deleteComment);

module.exports = router;
