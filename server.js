import http from 'http';
import app from './src/app.js';
import { PORT } from './src/config/config.js';
import { logger } from './src/utils/logger.js';


const server = http.createServer(app);
const startServer = () => {
    server.listen(`${PORT}`, () => {
        logger.log('info', `Server is listening to port: ${PORT}`);
    });
}

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        logger.log('error', `Port ${PORT} already in use, retrying...`);
        setTimeout(() => {
            server.close();
            startServer();  
        }, 1000);
    } else if (e.code == 'EACCES') {
        logger.log('error', `Permission denied to use port ${PORT}`);
        process.exit(1);
    } else {
        logger.log('error', `Server error ${e.message}`);
        process.exit(1);
    }

});

// Graceful shutdown on SIGINT or SIGTERM
process.on('SIGINT', () => {
    logger.log('info', 'Received SIGINT. Shutting down server...');
    server.close(() => {
        logger.log('info', 'Server has shut down gracefully.');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    logger.log('info', 'Received SIGTERM. Shutting down server...');
    server.close(() => {
        logger.log('info', 'Server has shut down gracefully.');
        process.exit(0);
    });
});


startServer();