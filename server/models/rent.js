import mongoose from 'mongoose';

const rentSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['active', 'returned', 'cancelled'],
    default: 'active',
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  returnedAt: { type: Date },

  pricePerDay: { type: Number, required: true },
  totalCost: { type: Number, default: 0 },
  insuranceOption: {
    type: String,
    enum: ['basic', 'standard', 'premium'],
    default: 'basic',
  },
  additionalDrivers: { type: Number, default: 0, min: 0 },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
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

    const days = durationInMillis / (1000 * 60 * 60 * 24);

    // Base cost calculation
    let totalCost = days * this.pricePerDay;

    // Insurance cost calculation
    switch (this.insuranceOption) {
      case 'premium':
        totalCost += days * 30;
        break;
      case 'standard':
        totalCost += days * 20;
        break;
      case 'basic':
        totalCost += days * 10;
        break;
    }

    // Additional driver cost calculation
    totalCost += this.additionalDrivers * (days * 10);

    this.totalCost = totalCost;
  }

  this.updatedAt = Date.now();
  next();
});

const Rent = mongoose.model('Rent', rentSchema);
export default Rent;
