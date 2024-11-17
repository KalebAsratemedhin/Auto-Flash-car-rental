import express from 'express';
import {addRating, getRatingsByCar, deleteRating, getOneRating, getFavoriteCars} from '../controllers/rating.js';
import {authenticateUser} from '../middleware/auth.js';
const router = express.Router();


router.post("/cars/:carId", authenticateUser, addRating);
router.get("/cars/:carId/users/current-user", authenticateUser, getOneRating);
router.get("/cars/:carId", getRatingsByCar);
router.get("/users/current-user", getFavoriteCars);
router.delete("/:ratingId", authenticateUser, deleteRating);


export default router;
