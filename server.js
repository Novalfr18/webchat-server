const http = require('http');
const WebSocket = require('ws');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WebSocket server is running");
});

const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
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

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
