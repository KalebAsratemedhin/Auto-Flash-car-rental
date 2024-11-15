import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({

  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  make: { type: String, required: true },
  model: { type: String, required: true },
  age: { type: Number, required: true },
  count: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true }, 
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);
export default Car;