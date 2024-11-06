const express = require("express");
const router = express.Router();
const {addRating, getRatingsByCar, deleteRating, getOneRating, updateRating} = require("../controllers/rating");
const {authenticateUser} = require("../middleware/auth");

router.post("/cars/:carId", authenticateUser, addRating);
router.get("/cars/:carId/users/current-user", authenticateUser, getOneRating);
router.get("/cars/:carId", getRatingsByCar);
router.delete("/:ratingId", authenticateUser, deleteRating);
router.put("/:ratingId", authenticateUser, updateRating);


module.exports = router;
