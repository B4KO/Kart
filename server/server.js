const express = require('express');
const cors = require('cors'); // CORS middleware
const XLSX = require('xlsx');
const app = express();
const port = 5000;

// Middleware to enable CORS
app.use(cors());

// Simple route to send a "Hello, World!" message
app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello, World from the server!' });
  console.log('emitted hello world to client :)');
});
// Simple give data from excel
app.get('/api/v1/read-projects', (req, res) => {
  // Load the workbook
  const workbook = XLSX.readFile('./data/projects.xlsx');
  // Get the first sheet name
  const sheetName = workbook.SheetNames[0];
  // Get the sheet data
  const sheet = workbook.Sheets[sheetName];
  // Convert sheet data to JSON
  const data = XLSX.utils.sheet_to_json(sheet);
  res.status(200).json(data);
  console.log(data);
});

// Only start the server if it's not being tested
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app; // Change export to CommonJS