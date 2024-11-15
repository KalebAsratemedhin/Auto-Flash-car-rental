import mongoose from 'mongoose';

const rentSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  rentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  status: { 
    type: String, 
    enum: ['pending', 'active', 'returned', 'cancelled'], 
    default: 'pending' 
  },
  startDate: { type: Date, required: true },  
  endDate: { type: Date, required: true }, 
  returnedAt: { type: Date }, 
  
  pricePerDay: { type: Number, required: true }, 
  totalCost: { type: Number, default: 0 },  
  paymentStatus: { 
    type: String, 
    enum: ['unpaid', 'paid', 'refunded'], 
    default: 'unpaid' 
  },
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }
});

rentSchema.pre('save', function (next) {
  if (!this.totalCost && this.startDate && this.endDate && this.pricePerDay) {
    if (new Date(this.endDate) < new Date(this.startDate)) {
      return next(new Error('End date cannot be before start date.'));
    }

    const durationInMillis = new Date(this.endDate) - new Date(this.startDate);
    if (durationInMillis <= 0) {
      return next(new Error('Rental duration must be positive.'));
    }

    this.totalCost = (durationInMillis / (1000 * 60 * 60 * 24)) * this.pricePerDay;  // Convert duration to days
  }
  
  this.updatedAt = Date.now();
  next();
});

const Rent = mongoose.model('Rent', rentSchema);
export default Rent;
