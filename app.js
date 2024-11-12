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

app.get('/chat', respondChat);

function respondChat(req, res) {
    const { message } = req.query;
  
    // Log received messages for verification
    console.log("Received message:", message);
  
    // Emit a 'message' event
    chatEmitter.emit('message', message);
  
    // End the response
    res.end();
  }


/function respondSSE(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
    });
  
    const onMessage = (message) => res.write(`data: ${message}\n\n`);
    chatEmitter.on('message', onMessage);
  
    res.on('close', () => {
      chatEmitter.off('message', onMessage);
    });
  }
  
  // Start the server
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });