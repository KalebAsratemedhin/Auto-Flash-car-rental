import express from 'express';
import {addRating, getRatingsByCar, deleteRating, getOneRating, updateRating} from '../controllers/rating.js';
import {authenticateUser, isAdmin, isSuperAdmin} from '../middleware/auth.js';
const router = express.Router();


router.post("/cars/:carId", authenticateUser, addRating);
router.get("/cars/:carId/users/current-user", authenticateUser, getOneRating);
router.get("/cars/:carId", getRatingsByCar);
router.delete("/:ratingId", authenticateUser, deleteRating);
router.put("/:ratingId", authenticateUser, updateRating);


export default router;
