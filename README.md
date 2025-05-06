# Broadcast Server CLI

roadmap.sh backend project – https://roadmap.sh/projects/broadcast-server

A real-time broadcast server built with WebSocket and Node.js. Multiple clients can connect to the server and exchange messages in real time. Each client receives messages from all others, and every message is also saved into a `.log` file for historical reference.

✅ **Features**

- Real-time messaging between multiple clients
- Unique color assigned to each client
- Server-side message logging with timestamps
- Server and client both run via CLI using `ts-node`
- Simple and lightweight, built with TypeScript

📦 **Tech Stack**

- Node.js
- TypeScript
- WebSocket (`ws`)
- `chalk` for colored terminal output
- `readline` for CLI input
- `dotenv` for environment variable management
- Native `fs` and `path` modules

🚀 **Getting Started**

### 1. Clone the project

```bash
git clone https://github.com/RafhaelBrum/caching-proxy-cli.git
cd broadcast-server-cli
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add a `.env` file

Create a `.env` file in the root with the following:

```
PORT=8080
```

### 4. Start the WebSocket server

```bash
npm run server
```

### 5. Connect a client (in another terminal tab)

```bash
npm run client
```

You can open as many clients as you want. Each one will receive messages broadcasted from others.

📘 **Usage**

- Type messages in any client window and press Enter.
- Messages will appear in all other connected clients in real time.
- Messages are color-coded per client.
- All messages are saved in `chat.log` with timestamps.

📄 **Log File**

A file called `chat.log` is automatically created in the root of the project. It stores all messages in the format:

```
[2025-05-05T18:30:00.000Z] - Client 1: Hello!
```

⚠️ **Notes**

- Messages from the sender are not reprinted on their screen (only on others).
- The project is CLI-only; there’s no GUI or HTTP layer.

📄 **License**

This project is for educational purposes. Free to use and modify.
