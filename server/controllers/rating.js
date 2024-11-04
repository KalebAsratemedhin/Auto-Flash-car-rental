const Rating = require("../models/rating");

const addRating = async (req, res) => {
  try {
    const { carId, score } = req.body;
    const userId = req.user.id; 
    const rating = new Rating({ userId, carId, score });
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ message: "Error adding rating", error });
  }
};


const getRatingsByCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const ratings = await Rating.find({ carId }).populate("userId", "name");
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ratings", error });
  }
};

const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    await Rating.findByIdAndDelete(ratingId);
    res.json({ message: "Rating deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting rating", error });
  }
};

module.exports = {
    addRating,
    getRatingsByCar,
    deleteRating
};
