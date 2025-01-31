import http from 'http';
import dotenv from 'dotenv';
import app from './src/app.js'

dotenv.config('.env');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port , () => {
  console.log(`server listening on port ${port}`);
})