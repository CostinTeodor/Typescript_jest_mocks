import { Server, WebSocket as WebSocketType } from 'ws';
const WebSocket = require('ws');

import { EventEmitter } from 'events';

class CustomEventEmitter extends EventEmitter {}

const port = 8080;
const server = new Server({ port });
const eventEmitter = new CustomEventEmitter();

console.log(`Server is running on port ${port}`);

server.on('connection', (socket: WebSocketType) => {
    console.log('Client connected.');

    socket.on('message', (message: string) => {
        const { topic, data } = JSON.parse(message);
        eventEmitter.emit(topic, data, socket);
    });

    socket.on('close', () => {
        console.log('Client disconnected.');
    });
});

eventEmitter.on('subscribe', (topic: string, socket: WebSocketType) => {
    console.log(`Client subscribed to: ${topic}`);
});

eventEmitter.on('publish', (message: string, socket: WebSocketType) => {
    console.log(`Message from client: ${message}`);
});
