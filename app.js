// app.js
const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

// Start server with request and response handling
const server = http.createServer(function (request, response) {
    response.setHeader('Content-Type', 'application/json');
  
    // Define a JavaScript object to send as JSON
    const data = {
      text: 'hi',
      number: [1, 2, 3]
    };
    // Convert the object to a JSON string and send it as the response
  response.end(JSON.stringify(data));
});

// Listen on the specified port
server.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
