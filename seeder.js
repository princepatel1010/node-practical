require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('./models');

const MONGODB_URL = process.env.MONGODB_URL;

const seedAdminUser = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Connected to MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@admin.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const adminUser = new User({
      email: 'admin@admin.com',
      password: await bcrypt.hash('Admin@123', 8),
      role: 'admin',
      phoneNumber: '00000000000',
    });

    await adminUser.save();
    console.log('Admin user seeded successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedAdminUser();
