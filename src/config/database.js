import mongoose from 'mongoose';
import { MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } from './config.js';
import { logger } from '../utils/logger.js';

const mongoUri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`;

const connectWithRetry = () => {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            logger.log('info', 'Connection established to MongoDB');
        })
        .catch((e) => {
            logger.log('error', `MongoDB connection error: ${e.message}`);
            // Retry connection after every 5 seconds
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();
