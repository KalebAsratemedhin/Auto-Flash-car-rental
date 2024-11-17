import Car from '../models/car.js';
import Rent from '../models/rent.js';

export const createRent = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const userId = req.user.id;
    const { carId } = req.params;

    const car = await Car.findById(carId).populate('owner');
    if (!car) return res.error('Car not found', 404);

    if (userId === car.owner._id.toString()) {
      return res.error('You cannot rent your own car.', 403);
    }

    if (car.available === 0) return res.error('Car not available.', 400);

    const rent = await Rent.create({
      startDate,
      endDate,
      pricePerDay: car.price,
      car: carId,
      renter: car.owner._id,
      rentee: userId,
    });

    car.available -= 1;
    await car.save();

    res.success('Rental request created successfully', 201, rent);
  } catch (error) {
    res.error('Failed to create rental request', 500, [error.message]);
  }
};

export const evaluateRent = async (req, res) => {
  try {
    const { rentId } = req.params;
    const { status } = req.body;
    const { id } = req.user;

    const rent = await Rent.findById(rentId);
    if (!rent) return res.error('Rent not found', 404);

    if (rent.renter.toString() !== id) {
      return res.error('You are not authorized to evaluate this rental', 403);
    }

    rent.status = status;
    await rent.save();

    res.success('Rental evaluated successfully', 200, rent);
  } catch (error) {
    res.error('Failed to evaluate rental', 500, [error.message]);
  }
};

export const getCurrentUserRents = async (req, res) => {
  try {
    const { id } = req.user;

    const rents = await Rent.find({
      $or: [{ rentee: id }, { renter: id }],
    }).populate('car');

    res.success('User rents retrieved successfully', 200, rents);
  } catch (error) {
    res.error('Failed to retrieve user rents', 500, [error.message]);
  }
};

export const cancelRent = async (req, res) => {
  try {
    const { rentId } = req.params;
    const { id } = req.user;

    const rent = await Rent.findById(rentId);
    if (!rent) return res.error('Rent not found', 404);

    if (rent.rentee.toString() === id) {
      await rent.deleteOne();
      return res.success('Rent cancelled successfully', 200);
    }

    res.error('Unauthorized', 403);
  } catch (error) {
    res.error('Failed to cancel rent', 500, [error.message]);
  }
};
