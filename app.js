const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

/**
 * Serves up the chat.html file
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function chatApp(req, res) {
  res.sendFile(path.join(__dirname, '/chat.html'));
}

// Route for serving chat.html
app.get('/', chatApp);

// Array to keep track of connected clients for SSE
const clients = [];

// /chat endpoint to receive messages and broadcast to clients
app.get('/chat', (req, res) => {
  const { message } = req.query;
  
  if (message) {
    // Broadcast message to all connected clients
    clients.forEach(client => client.write(`data: ${message}\n\n`));
  }
  
  // End the response
  res.status(204).end();
});

// /sse endpoint to establish SSE connection with clients
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Keep connection alive with heartbeat every 15 seconds
  const keepAlive = setInterval(() => res.write(': keep-alive\n\n'), 15000);

  // Add client to clients array
  clients.push(res);

  // Remove client on disconnect
  req.on('close', () => {
    clearInterval(keepAlive);
    clients.splice(clients.indexOf(res), 1);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
