// app.js
const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

/**
 * Responds with plain text
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function respondText(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hi');
}

/**
 * Responds with JSON
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function respondJson(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }));
}

/**
 * Responds with a 404 not found
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function respondNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

// Create the server and handle routing
const server = http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url, true);
  
  if (parsedUrl.pathname === '/text') {
    respondText(request, response);
  } else if (parsedUrl.pathname === '/json') {
    respondJson(request, response);
  } else {
    respondNotFound(request, response);
  }
});

// Start the server and listen on the specified port
server.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});

