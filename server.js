import http from 'http';
import app from './src/app.js'
import { PORT } from './config/config.js';

const server = http.createServer(app);

server.listen(`${PORT}`, () => {
    console.log(`server listening on port ${PORT}`);
})