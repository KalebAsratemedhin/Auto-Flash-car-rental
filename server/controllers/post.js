import Car from '../models/car.js';

export const postCar = async (req, res) => {
  try {
    const { make, model, description, year, price, transmission, fuelType, seats} = req.body;

    const photoPath = req.file.path
    const {id} = req.user

    if (!photoPath) {
      return res.error('Photo is required', 404);
    }

    const newCar = await Car.create({
      owner: id,
      make,
      model,
      seats: parseInt(seats),
      year: parseInt(year),
      price: parseInt(price),
      description,
      transmission,
      fuelType,
      photo: photoPath
    });

    res.success('Car posted successfully', 201, newCar );
  } catch (error) {
    res.error('Internal server error.', 500, [error.message]);
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
  
      res.success( 'Cars fetched successfully', 200, 
        {
          cars, 
          totalPages: Math.ceil(totalCars/ limit), 
          currentPage: page
        } 
      );

    } catch (error) {
      res.error('Internal server error.', 500, [error.message]);
    }
};

export const getOneCar = async (req, res) => {
  try {
    const {carId} = req.params
    const car = await Car.findById(carId);

    res.success('Car fetched successfully', 200, car);

  } catch (error) {
    res.error('Internal server error.', 500, [error.message]);
  }
};


export const getAdminCars = async (req, res) => {
  try {

    const {userId} = req.params
    const cars = await Car.find({owner: userId});

    res.success('Cars fetched successfully', 200, cars);
  } catch (error) {
    res.error('Internal server error.', 500, [error.message]);
  }
};


