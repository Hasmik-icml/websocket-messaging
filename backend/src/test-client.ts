import WebSocket from 'ws';
import { generateMessage } from './helpers/generate-messages';
import { getRandomType } from './helpers/random-type';

const url = "ws://localhost:3011";
const totalMessages = 200;
const connectionCount = 1000;

let sentMessages = 0;
let receivedMessages = 0;

let connections = [];

for (let i = 0; i < connectionCount; i++) {
    const ws = new WebSocket(url);
    connections.push(ws);

    ws.on('open', function open() {
        console.log('Connected to server');

        for (let i = 0; i < totalMessages; i++) {
            const type = getRandomType();  // Ռանդոմ կերպով ընտրում ենք մեսիջի տեսակը
            const message = generateMessage(type) || '';
            ws.send(message);
            sentMessages++;
        }
    });

    ws.on('message', function incoming(data) {
        receivedMessages++;
        //   console.log(`Received message: ${data}`);

        if (receivedMessages === totalMessages) {
            console.log(`All messages received: ${receivedMessages}`);
            ws.close();
        }
    });
    
    ws.on('close', function close() {
        console.log('Disconnected from server');
        console.log(`Total sent messages: ${sentMessages}`);
        console.log(`Total received messages: ${receivedMessages}`);
    });

    ws.on('error', function error(err) {
        console.error('WebSocket error:', err);
    });
}



