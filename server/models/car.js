import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    make: { type: String, required: true },
    status: { 
      type: String,
      enum: ['available', 'rented'], 
      default: 'available', 
    },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    seats: { type: Number, required: true }, 
    photo: { type: String, requiredd: true }, 
  },
  { timestamps: true }
);
const Car = mongoose.model('Car', carSchema);
export default Car;