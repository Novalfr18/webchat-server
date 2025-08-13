const WebSocket = require('ws');

// Railway will set process.env.PORT
const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });

let clients = [];

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Broadcast to all connected clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  clients.push(ws);

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

console.log(`WebSocket server running on port ${port}`);
