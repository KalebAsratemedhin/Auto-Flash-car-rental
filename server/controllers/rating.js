import Rating from '../models/rating.js'

export const addRating = async (req, res) => {
  try {
    const {carId} = req.params
    const { score } = req.body;
    const userId = req.user.id; 

    const existing = await Rating.findOne({carId, userId})

    if(existing){
      existing.score = score
      await existing.save()
      return res.success('Rating updated successfully', 200, existing.toObject());
    }

    const rating = await Rating.create({ userId, carId, score });

    res.success('Rating created successfully', 201, rating.toObject());
  } catch (error) {
    res.error('Internal server error.', 500, [error.message]);
    
  }
};


export const getRatingsByCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const reviews = await Rating.countDocuments(carId)

    const ratings = await Rating.find({ carId })
    let totalScore = 0

    for(const rating of ratings){
        totalScore += rating.score
    }
    
    res.success('Ratings fetched successfully', 200, {averageScore: totalScore / reviews, reviews} );

  } catch (error) {
    res.error('Internal server error.', 500, [error.message]);
  }
};

export const getOneRating = async (req, res) => {
    try {
      const userId = req.user.id
      const { carId } = req.params;
      const rating = await Rating.findOne({ carId, userId });

      return res.success('Rating fetched successfully', 200, rating);

    } catch (error) {
      res.error('Internal server error.', 500, [error.message]);
    }
  };

export const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    await Rating.findByIdAndDelete(ratingId);
    return res.success('Rating deleted successfully', 202, rating);


  } catch (error) {
    res.error('Internal server error.', 500, [error.message]);
  }
};


export const getFavoriteCars = async (req, res) => {
  try {
    const {id} = req.user;
    const favs = await Rating.find({userId: id})
    
    res.success('Favorites fetched successfully', 200, {favs} );

  } catch (error) {
    res.error('Internal server error.', 500, [error.message]);
  }
};