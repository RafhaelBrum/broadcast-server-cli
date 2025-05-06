import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

dotenv.config();
const PORT = Number(process.env.PORT);
const wss = new WebSocketServer({ port: PORT, });
const clients = new Set<WebSocket>();

var clientCount = 0;

wss.on('connection', (ws: WebSocket) => {
    clients.add(ws);
    clientCount++
    const clientNumber = clientCount;
    console.log(`New client connected: Client ${ clientNumber }`);


    ws.on('message', (message: string) => {
        console.log(`Received message: ${ message }`);
        broadcast(message);
    });

    ws.on('close', () => {
        console.log(`Client ${ clientNumber } disconnected`);
        clients.delete(ws);
    });

});

function broadcast(message: string) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

console.log(`WebSocket server started on port ${ PORT }`);