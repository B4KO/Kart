const express = require('express');
const cors = require('cors'); // CORS middleware
const app = express();
const port = 5000;

// Middleware to enable CORS
app.use(cors());

// Simple route to send a "Hello, World!" message
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World from the server!' });
  console.log('emitted hello world to client :)');
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
