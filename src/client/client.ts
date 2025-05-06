import WebSocket from "ws";
import readline from 'node:readline';
import chalk from 'chalk';

const colors = [chalk.green, chalk.blue, chalk.magenta, chalk.cyan, chalk.yellow, chalk.red];

function getColorFromNumber(clientNumber: number) {
    return colors[(clientNumber - 1) % colors.length];
};


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
    console.log('----------- Connected to server -----------\n\n');
});

ws.on('message', (message: string) => {
    const currentInput = r1.line;
    const text = message.toString().trim();

    const match = text.match(/^Client (\d+):/);
    const number = match ? parseInt(match[1]) : 0;
    const color = getColorFromNumber(number);


    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);

    console.log(color(text));

    refreshInput(currentInput);
    r1.prompt(true);
});

ws.on('close', () => {
    console.log('Client disconnected from server');
    r1.close();
});