import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import gameRoutes from './routes/gameRoutes.js';  
import pool from './database/database.js';
import wsHandler from './realTime/realTimeActions.js';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());

app.use('/api', gameRoutes);

wsHandler(wss, pool);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
