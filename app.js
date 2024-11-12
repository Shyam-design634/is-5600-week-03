// app.js
const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

// Start server with request and response handling
const server = http.createServer(function (request, response) {
  response.end("hi");
});

// Listen on the specified port
server.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
