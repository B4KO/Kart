const request = require('supertest');
const app = require('./server.js'); // Use CommonJS require
//
const XLSX = require('xlsx');

//lol
// Function to read the Excel file and return the data as JSON
function readExcelFile(filePath) {
    const workbook = XLSX.readFile(filePath);  // Read the Excel file
    const sheetName = workbook.SheetNames[0];   // Get the first sheet
    const sheet = workbook.Sheets[sheetName];   // Access the sheet
  
    // Convert sheet to JSON and return
    return XLSX.utils.sheet_to_json(sheet);
  }

let server; // Define server instance

beforeAll(() => {
  server = app.listen(5001); // Run app on a test port
});

afterAll(() => {
  server.close(); // Ensure the server shuts down after tests
});

test('GET /api/hello should return 200', async () => {
  const res = await request(server).get('/api/hello'); // Use `server` instead of `app`
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Hello, World from the server!');
});

test('GET /api/v1/read-projects should return 200', async () => {
    const res = await request(server).get('/api/v1/read-projects');
    expect(res.statusCode).toBe(200);
});

test('GET /api/v1/read-projects should return expected json', async () => {
    // Read the data from the Excel file dynamically
    const excelData = readExcelFile('../data/projects.xlsx'); // Replace with your actual file path
  
    // Make the request to your server
    const res = await request(app).get('/api/v1/read-projects');
  
    // Check if the response status is OK
    expect(res.statusCode).toBe(200);
  
    // Compare the response data with the data from the Excel file
    expect(res.body).toEqual(expect.arrayContaining(excelData));
  
    // Or, for more granular checks, compare each field explicitly
    res.body.forEach((row, index) => {
      expect(row.name).toBe(excelData[index].name);
      expect(row.age).toBe(excelData[index].age);
      expect(row.city).toBe(excelData[index].city);
    });
  });
