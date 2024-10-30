const Car = require('../models/car');

const postCar = async (req, res) => {
  try {
    const { brand, model, description, age, price, count} = req.body;
    const photoPath = req.file ? req.file.path : null;
    const {username} = req.user
 
    if (!photoPath) {
      return res.status(400).json({ message: 'Photo is required' });
    }

    const newCar = await Car.create({
      username,
      brand,
      model,
      age,
      count,
      price,
      description,
      photo: photoPath
    });

    console.log('car', newCar)

    res.status(201).json({ message: 'Car posted successfully', data: newCar });
  } catch (error) {
    res.status(500).json({ message: 'Error posting car', error: error.message });
  }
};

const getCurrentUserCars = async (req, res) => {
    try {
      const {username} = req.user
   
      const cars = await Car.find({
        username
      });
  
      console.log('cars', cars)
  
      res.status(201).json({ message: 'Car posted successfully', data: cars });
    } catch (error) {
      res.status(500).json({ message: 'Error posting car', error: error.message });
    }
  };

const getAllCars = async (req, res) => {
    try {
      
      const cars = await Car.find();
  
      console.log('cars', cars)
  
      res.status(201).json({ message: 'Cars fetched successfully', data: cars });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cars', error: error.message });
    }
};

const getOneCar = async (req, res) => {
  try {
    console.log('req a car', req.params)

    const {carId} = req.params
    const car = await Car.findById(carId);

    console.log('cars', car)

    res.status(201).json({ message: 'Cars fetched successfully', data: car });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
};
module.exports = { postCar, getCurrentUserCars, getAllCars, getOneCar};
