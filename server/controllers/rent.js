const Rent = require('../models/rent');
const Car = require('../models/car');

const createRent = async (req, res) => {
  try {
    const { name, contact, duration, carId } = req.body;
    const { username } = req.user;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const rent = await Rent.create({
      name,
      contact,
      duration,
      car: carId,
      renter: car.username,
      rentee: username,
    });

    res.status(201).json({ message: 'Rental request created successfully', data: rent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create rental request' });
  }
};

const approveRent = async (req, res) => {
    try {
      const { rentId } = req.body;
      const { username } = req.user; 
  
      const rent = await Rent.findById(rentId);
      if (!rent) {
        return res.status(404).json({ message: 'Rental request not found' });
      }
  
      if (rent.renter !== username) {
        return res.status(403).json({ message: 'You are not authorized to approve this rental' });
      }
  
      const updatedRent = await Rent.findByIdAndUpdate(
        rentId,
        { status: 'active' },
        { new: true }
      );
  
      res.status(200).json({ message: 'Rental approved successfully', data: updatedRent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to approve rental' });
    }
  };
  
  const confirmReturn = async (req, res) => {
    try {
      const { rentId } = req.body;
      const { username } = req.user; 

      const rent = await Rent.findById(rentId);
      if (!rent) {
        return res.status(404).json({ message: 'Rental not found' });
      }
  
      if (rent.renter !== username) {
        return res.status(403).json({ message: 'You are not authorized to confirm return for this rental' });
      }
  
      const updatedRent = await Rent.findByIdAndUpdate(
        rentId,
        { status: 'returned' },
        { new: true }
      );
  
      res.status(200).json({ message: 'Rental returned successfully', data: updatedRent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to confirm return' });
    }
  };
  
  const getCurrentUserRents = async (req, res) => {
    try {
      const { username } = req.user;
  
      const rents = await Rent.find({
        $or: [
          { rentee: username },  
          { renter: username }   
        ]
      }).populate('car'); 
  
      res.status(200).json({ message: 'User rents retrieved successfully', data: rents });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve user rents' });
    }
  };
  

const getRentRequests = async (req, res) => {
  try {
    const { username } = req.user;

    const rentRequests = await Rent.find({ renter: username}).populate('car');
    res.status(200).json({ message: 'Rent requests retrieved successfully', data: rentRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve rent requests' });
  }
};

module.exports = { 
  createRent, 
  approveRent, 
  confirmReturn, 
  getCurrentUserRents, 
  getRentRequests 
};
