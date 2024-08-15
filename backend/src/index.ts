import ws from 'ws';

const PORT = Number(process.env.PORT) || 3000;

const server = new ws.Server({ port: PORT });
server.on('listening', () => {
  console.log(`Server is running on port ${PORT}`);
});


server.on('connection', (ws) => {
  ws.on('error', console.error);

  console.log('New client connected');

  ws.send("hello from server");

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    const msg = message.toString();

    server.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(msg);
      }
    })
  });

  // ws.on('close', () => {
  //     console.log('Client disconnected');
  // });
});