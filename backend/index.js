const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const path = require('path');
require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});