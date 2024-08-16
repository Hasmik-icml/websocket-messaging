import WebSocket from 'ws';
import { generateMessage } from './helpers/generate-messages';
import { getRandomType } from './helpers/random-type';

const url = "ws://localhost:3011";
const testMessageCounts = [200, 400, 600, 800, 1000];

for (let i = 0; i < testMessageCounts.length; ++i) {
    let ws = new WebSocket(url);
    let messagesSent = 0;
    let messagesReceived = 0;
    let startTime = Date.now();

    ws.on('open', function open() {
        console.log('Connected to server');

        for (let j = 0; j < testMessageCounts[i]; j++) {
            const type = getRandomType();  // Ռանդոմ կերպով ընտրում ենք մեսիջի տեսակը
            const message = generateMessage(type) || '';
            ws.send(message);
            messagesSent++;
        }
    }
    )

    ws.on('message', () => {
        messagesReceived++;
        if (messagesReceived === testMessageCounts[i]) {
            let endTime = Date.now();
            let timeTaken = endTime - startTime;
            console.log(`Test with ${testMessageCounts[i]} messages completed.`);
            console.log(`Time taken: ${timeTaken}ms`);
        }
    });

    ws.on('close', () => {
        console.log(`Connection closed after sending ${messagesSent} messages and receiving ${messagesReceived} messages.`);
    });

    ws.on('error', (err) => {
        console.error(`Error during test with ${testMessageCounts[i]} messages:`, err);
    });

}
