const Rating = require("../models/rating");

const addRating = async (req, res) => {
  try {
    const {carId} = req.params
    const { score } = req.body;
    const userId = req.user.id; 

    const existing = await Rating.findOne({carId, userId})

    if(existing){
      existing.score = score
      await existing.save()
      return res.status(200).json({message: 'updated rating successfully', data: existing.toObject()});
    }

    console.log('new rating carId, score, userId', carId, score, userId)
    const rating = await Rating.create({ userId, carId, score });

    console.log('rating', rating)
    res.status(201).json({message: 'created successfully', data: rating.toObject()});
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error adding rating", error });
  }
};


const getRatingsByCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const reviews = await Rating.countDocuments(carId)

    const ratings = await Rating.find({ carId })
    let totalScore = 0

    for(const rating of ratings){
        totalScore += rating.score
    }
    
    res.status(200).json({ message: 'Ratings fetched successfully', data: {averageScore: totalScore / reviews, reviews} });

  } catch (error) {
    res.status(500).json({ message: "Error fetching ratings", error });
  }
};

const getOneRating = async (req, res) => {
    try {
      const userId = req.user.id
      const { carId } = req.params;
      const rating = await Rating.findOne({ carId, userId });

      console.log('rating', rating)
      
      res.status(200).json({ message: 'Rating fetched successfully', data: rating });

    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error fetching ratings", error });
    }
  };

const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    await Rating.findByIdAndDelete(ratingId);
    res.status(200).json({ message: "Rating deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting rating", error });
  }
};

const updateRating = async (req, res) => {
    try {
      const { ratingId } = req.params;
      await Rating.findByIdAndUpdate(ratingId, req.body);
      res.status(200).json({ message: "Rating updated" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting rating", error });
    }
  };

module.exports = {
    addRating,
    getRatingsByCar,
    getOneRating,
    deleteRating,
    updateRating
};
