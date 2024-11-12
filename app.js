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
  const pathname = parsedUrl.pathname;

  console.log("url", pathname);
  
  if (pathname === '/') return respondText(request, response);
  if (pathname === '/json') return respondJson(request, response);

  respondNotFound(request, response);
});

// Start the server and listen on the specified port
server.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
