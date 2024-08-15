import websocket from 'ws';

export function setupWebSocket(server: any) {
    const wss = new websocket.Server({ server });

    wss.on('connection', async (ws) => {
        ws.on('error', console.error);

        console.log('New client connected');

        ws.send("hello from server");


        ws.on('message', async (message) => {
            console.log(`Received message: ${message}`);
            const msg = message.toString();


            wss.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(msg);
                }
            })
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

}



