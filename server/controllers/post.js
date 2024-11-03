const Car = require('../models/car');

const postCar = async (req, res) => {
  try {
    console.log('post req', req.body)
    console.log('file', req.file.path)
    const { make, model, description, age, price, count} = req.body;
    const photoPath = req.file.path
    const {id} = req.user
 
    if (!photoPath) {
      return res.status(400).json({ message: 'Photo is required' });
    }

    const newCar = await Car.create({
      owner: id,
      make,
      model,
      age: parseInt(age),
      count: parseInt(count),
      price: parseInt(price),
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


const getUserCars = async (req, res) => {
  try {

    const {owner} = req.query
    const cars = await Car.find({owner});

    res.status(201).json({ message: 'Cars fetched successfully', data: cars });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
};


module.exports = { postCar, getCurrentUserCars, getAllCars, getOneCar, getUserCars};
