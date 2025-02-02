import mongoose from 'mongoose';
import { MONGO_DB_NAME, MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } from './config.js';
import { logger } from '../utils/logger.js';

const mongoUri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`


mongoose.connect(mongoUri)
    .then(() => {
        logger.log('info', `Connection establised to MongoDB`);
    })
    .catch((e) => {
        logger.log('error', `MongoDB connection error: ${e.message}`);
    });