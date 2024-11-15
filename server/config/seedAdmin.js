import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/user.js'; 
import connectDatabase from './db.js';

const seedAdmin = async () => {
  try {

    connectDatabase()
    
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      fullName: 'Kaleb A.',
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();

    console.log('Admin user seeded successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();