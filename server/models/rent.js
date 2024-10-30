const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  duration: { type: Number, required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  renter: { type: String, ref: 'User', required: true }, 
  rentee: { type: String, ref: 'User', required: true},
  status: { 
    type: String, 
    enum: ['pending', 'active', 'returned'], 
    default: 'pending' 
  }, 
  rentedAt: { type: Date, default: Date.now },
});

const Rent = mongoose.model('Rent', rentSchema);
module.exports = Rent;
