import express from 'express';
import {addComment, getCommentsByCar, getOneComment, updateComment, deleteComment} from '../controllers/comment.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

router.post("/", authenticateUser, addComment);
router.get("/cars/:carId/users/current-user", authenticateUser, getOneComment);
router.get("/cars/:carId", getCommentsByCar);
router.put("/:commentId", authenticateUser, updateComment);
router.delete("/:commentId", authenticateUser, deleteComment);

export default router;
