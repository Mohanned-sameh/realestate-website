const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorMiddleware').default;
const path = require('path');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);
app.use(errorHandler);

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((error) => console.log('Error: ' + error));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
