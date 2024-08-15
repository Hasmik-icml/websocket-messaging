import express from 'express';
import { setupWebSocket } from './websocket';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

export function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return server;
};

setupWebSocket(startServer());
