const express = require("express");
const router = express.Router();
const {addRating, getRatingsByCar, deleteRating} = require("../controllers/rating");
const {authenticateUser} = require("../middleware/auth");

router.post("/", authenticateUser, addRating);
router.get("/:carId", getRatingsByCar);
router.delete("/:ratingId", authenticateUser, deleteRating);

module.exports = router;
