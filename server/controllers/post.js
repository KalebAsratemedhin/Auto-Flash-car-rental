import Car from '../models/car.js';

export const postCar = async (req, res) => {
  try {
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
      available: parseInt(count),
      price: parseInt(price),
      description,
      photo: photoPath
    });

    res.status(201).json({ message: 'Car posted successfully', data: newCar });
  } catch (error) {
    res.status(500).json({ message: 'Error posting car', error: error.message });
  }
};


export const getAllCars = async (req, res) => {

    try {
      
      const { page = 1, limit = 10, filter } = req.query;
      const skip = (page - 1) * limit;
      let cars;

      if(filter === 'all'){
        cars = await Car.find().skip(skip).limit(parseInt(limit));

      } else {
        cars = await Car.find({make: filter}).skip(skip).limit(parseInt(limit));
      }

      
      const totalCars = await Car.countDocuments()
  
      res.status(201).json({ 
        message: 'Cars fetched successfully', 
        data: cars, 
        totalPages: Math.ceil(totalCars/ limit), 
        currentPage: page 
      });

    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error fetching cars', error: error.message });
    }
};

export const getOneCar = async (req, res) => {
  try {
    const {carId} = req.params
    const car = await Car.findById(carId);


    res.status(201).json({ message: 'Cars fetched successfully', data: car });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
};


export const getAdminCars = async (req, res) => {
  try {

    const {userId} = req.params
    const cars = await Car.find({owner: userId});

    res.status(201).json({ message: 'Cars fetched successfully', data: cars });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
};


