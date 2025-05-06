import WebSocket from "ws";
import readline from 'node:readline';

const PORT = 8080;
const ws = new WebSocket(`ws://localhost:${ PORT }`);
const r1 = readline.createInterface({ input: process.stdin, output: process.stdout });

function refreshInput(input: string) {
    process.stdout.write('\r\x1b[K');
    process.stdout.write(input);
};

r1.on('line', (message: string) => {
    if (message.trim().length > 0) {
        ws.send(message);
    }
    r1.prompt();
})


ws.on('open', () => {
    console.log('Connected to server');
    ws.send('Hello server');
});

ws.on('message', (message: string) => {
    const currentInput = r1.line;

    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);

    console.log(message.toString().trim());

    refreshInput(currentInput);
    r1.prompt(true);
});

ws.on('close', () => {
    console.log('Client disconnected from server');
    r1.close();
});