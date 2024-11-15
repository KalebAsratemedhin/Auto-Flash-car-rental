import Car from '../models/car.js'
import Rent from '../models/rent.js'

export const createRent = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const userId = req.user.id;
    const {carId} = req.params

 
    const car = await Car.findById(carId).populate('owner');
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if(userId === car.owner._id.toString() ){
      return res.status(404).json({ message: 'You cannot rent your own car.' });
    }


    if (car.available == 0){
      return res.status(404).json({ message: 'Car not available.' });

    }


    const rent = await Rent.create({
      startDate,
      endDate,
      pricePerDay: car.price,
      car: carId,
      renter: car.owner._id,
      rentee: userId,
    });

    car.available -= 1
    await car.save()

    res.status(201).json({ message: 'Rental request created successfully', data: rent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create rental request' });
  }
};

export const evaluateRent = async (req, res) => {
    try {
      const { rentId } = req.params;
      const { status } = req.body;
      const { id } = req.user; 
  
      const rent = await Rent.findById(rentId);
      if (!rent) {
        return res.status(404).json({ message: 'Rent not found' });
      }
  
      if (rent.renter.toString() !== id) {
        return res.status(403).json({ message: 'You are not authorized to evaluate this rental' });
      }
  
      const updatedRent = await Rent.findByIdAndUpdate(
        rentId,
        { status: status },
        { new: true }
      );
  
      res.status(200).json({ message: 'Rental approved successfully', data: updatedRent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to approve rental' });
    }
  };
  
  export const getCurrentUserRents = async (req, res) => {
    try {
      const { id } = req.user;
  
      const rents = await Rent.find({
        $or: [
          { rentee: id },  
          { renter: id }   
        ]
      }).populate('car'); 
  
      res.status(200).json({ message: 'User rents retrieved successfully', data: rents });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve user rents' });
    }
  };
  

export const cancelRent = async (req, res) => {
  try {
    const {rentId} = req.params
    const {id} = req.user

    const rent = await Rent.findById(rentId)

    if(rent.rentee.toString() === id){
      await rent.deleteOne()
      return res.status(200).json({ message: 'Rent cancelled successfully' });

    }
    return res.status(401).json({ message: 'Unauthorized.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve rent requests' });
  }
};

