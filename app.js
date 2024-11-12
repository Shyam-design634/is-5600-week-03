const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

// Function declarations for respondText, respondJson, respondNotFound, and respondEcho
function respondText(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hi');
}

function respondJson(req, res) {
  res.json({
    text: 'hi',
    numbers: [1, 2, 3],
  });
}

function respondEcho(req, res) {
  // Extract the 'input' query parameter with a default value of an empty string
  const { input = '' } = req.query;

  // Send the JSON response with various transformations of 'input'
  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    charCount: input.length,
    backwards: input.split('').reverse().join(''),
  });
}

function respondNotFound(req, res) {
  res.status(404).send('Not Found');
}

// Define routes using Express
app.get('/', respondText);
app.get('/json', respondJson);
app.get('/echo', respondEcho);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
