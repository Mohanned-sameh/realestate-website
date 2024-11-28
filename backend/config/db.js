const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = async () => {
  if (!process.env.MONGODB_URL) {
    console.error(
      'Error: MONGODB_URL is not defined in environment variables.'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = db;
