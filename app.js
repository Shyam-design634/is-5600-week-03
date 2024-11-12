const express = require('express');
const path = require('path');
const EventEmitter = require('events');

const port = process.env.PORT || 3000;
const app = express();
const chatEmitter = new EventEmitter();

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

function respondChat(req, res) {
    const { message } = req.query;
  
    // Log received messages for verification
    console.log("Received message:", message);
  
    // Emit a 'message' event
    chatEmitter.emit('message', message);
  
    // End the response
    res.end();
  }


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
