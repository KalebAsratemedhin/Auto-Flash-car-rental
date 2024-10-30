const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({

  username: {
    type: String,
    ref: "User",
    required: true
  },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  age: { type: Number, required: true },
  count: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true }, 
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);
module.exports = Car;