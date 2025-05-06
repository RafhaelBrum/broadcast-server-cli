import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

dotenv.config();
const PORT = Number(process.env.PORT);
const wss = new WebSocketServer({ port: PORT, });
const clientMap = new Map<WebSocket, { number: number, color: typeof chalk.white }>();
const colors = [chalk.green, chalk.blue, chalk.magenta, chalk.cyan, chalk.yellow, chalk.red];
const logPath = path.join(__dirname, '../../chat.log');
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
            broadcast(`Client ${ number }: ${ message }`, ws);
            saveHistory(message, number);
        }
    });

    ws.on('close', () => {
        clientMap.delete(ws);
        console.log(clientColor(`>> Client ${ clientNumber } disconnected`));
    });

});

function broadcast(message: string, sender: WebSocket) {
    wss.clients.forEach(client => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

function saveHistory(message: string, user: number) {
    const timestamp = new Date().toISOString();
    fs.appendFile(logPath, `[${ timestamp }] - Client ${ user }: ${ message }\n`, (err) => {
        if (err) console.log('error writing file', err);
    });
};

console.log(`Server started on port ${ PORT }`);