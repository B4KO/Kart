const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const express = require('express');
const cors = require('cors'); // CORS middleware
const XLSX = require('xlsx');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        optionsSuccessStatus: 200
    }
));


app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello, World from the server!' });
  console.log('emitted hello world to client :)');
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is the root route' });
});



app.get('/api/v1/read-projects', (req, res) => {
  // Load the workbook
  const workbook = XLSX.readFile('../data/projects.xlsx');

  const sheetName = workbook.SheetNames[0];

  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet);

  res.status(200).json(data);

  console.log('Emitted projects data to client');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app; // Change export to CommonJS