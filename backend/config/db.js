const mongoose = require('mongoose');
require('dotenv').config();

const db = mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

module.exports = db;
