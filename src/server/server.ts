import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

dotenv.config();
const PORT = Number(process.env.PORT);
const wss = new WebSocketServer({ port: PORT, });

const clients = new Set<WebSocket>();

wss.on('connection', (ws: WebSocket) => {
    clients.add(ws);
    console.log(`New client connected: Client ${ clients.size }`);

    ws.on('message', (message: string) => {
        console.log(`Received message: ${ message }`);
        ws.send(`Server received your message: ${ message }`);
    });

    ws.on('close', () => {
        console.log(`Client ${ ws } disconnected`);
        clients.delete(ws);
    });

});