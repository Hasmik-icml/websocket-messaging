import websocket from 'ws';
import { MessageRepo } from './prisma';

export function setupWebSocket(server: any) {
    const wss = new websocket.Server({ server });

    wss.on('connection', async (ws) => {
        ws.on('error', console.error);

        console.log('New client connected');

        ws.send("hello from server");

        // Comment to avoid double Receiv message
        const messages = await MessageRepo.repo.findMany();

        messages.forEach((message) => {
            ws.send(message.content);
        })

        ws.on('message', async (message) => {
            console.log(`Received message: ${message}`);
            const msg = message.toString();

            await MessageRepo.repo.create({
                data: { content: msg },
            });

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



