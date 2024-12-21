import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/user.js'; 
import connectDatabase from './db.js';
import 'dotenv/config'; 


const seedAdmin = async () => {
  try {

    connectDatabase()
    
    const existingAdmin = await User.findOne({ role: 'super-admin' });
    if (existingAdmin) {
      return;
    }

    const hashedPassword = await bcrypt.hash('12345super', 10);

    const adminUser = new User({
      firstName: 'Kaleb',
      lastName: 'Asratemedhin',
      username: 'admin',
      email: 'super@example.com',
      password: hashedPassword,
      role: 'super-admin',
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