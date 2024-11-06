
const express = require("express");
const router = express.Router();
const {addComment, getCommentsByCar, getOneComment, updateComment, deleteComment} = require("../controllers/comment");
const {authenticateUser} = require("../middleware/auth");

router.post("/", authenticateUser, addComment);
router.get("/cars/:carId/users/current-user", authenticateUser, getOneComment);
router.get("/cars/:carId", getCommentsByCar);
router.put("/:commentId", authenticateUser, updateComment);
router.delete("/:commentId", authenticateUser, deleteComment);

module.exports = router;
