const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./src/config');
const contactRoutes = require('./src/routes/contact');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Security and Logging
app.use(helmet());
app.use(morgan(config.NODE_ENV === 'development' ? 'dev' : 'short'));

// CORS Configuration
const corsOptions = {
  origin: config.NODE_ENV === 'development' ? '*' : ['http://localhost:5173']
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '10kb' }));

// MongoDB Connection
mongoose.connect(config.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error: ', err);
    process.exit(1);
  });

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Portfolio API Backend Running' });
});

app.use('/api/contact', contactRoutes);

// Error Handler
app.use(errorHandler);

const server = app.listen(config.PORT, () => {
  console.log(`Node Server running on port ${config.PORT}`);
});

// Graceful Shutdown
const shutdown = () => {
  console.log('\nGraceful shutdown initiated...');
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
