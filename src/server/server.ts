import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();
const PORT = Number(process.env.PORT);
const wss = new WebSocketServer({ port: PORT, });
const clientMap = new Map<WebSocket, { number: number, color: typeof chalk.white }>();
const colors = [chalk.green, chalk.blue, chalk.magenta, chalk.cyan, chalk.yellow, chalk.red];
var clientCount = 0;

wss.on('connection', (ws: WebSocket) => {
    clientCount++;
    const clientNumber = clientCount;
    const clientColor = colors[(clientCount - 1) % colors.length];

    clientMap.set(ws, { number: clientNumber, color: clientColor });
    console.log(clientColor(`>> Client ${ clientNumber } connected`));


    ws.on('message', (message: string) => {
        const clientData = clientMap.get(ws);
        if (clientData) {
            const { number, color } = clientData;
            console.log(color(`Client ${ number }: ${ message }`));
            broadcast(`Client ${ number }: ${ message }`);
        }

    });

    ws.on('close', () => {
        clientMap.delete(ws);
        console.log(clientColor(`>> Client ${ clientNumber } disconnected`));
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