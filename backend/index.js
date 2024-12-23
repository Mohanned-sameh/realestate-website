const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorMiddleware');
const app = express();

require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(errorHandler);

const port = process.env.PORT || 3000;

connectDB();
app.listen(port, () => {
  console.log('Server is running on port 3000');
});
