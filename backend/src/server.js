import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config/index.js';
import appRoutes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import requestLogger from './middlewares/requestLogger.js';

const app = express();
const PORT = config.port;
const MONGO_URI = config.mongoUri;

// --- MongoDB Connection ---
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

// --- Middleware Setup ---
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded requests

app.use(requestLogger);

// --- Routes ---
app.use('/api', appRoutes);

// --- Error Handling Middleware ---
// This must be the last middleware added
app.use(errorHandler);