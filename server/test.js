const request = require('supertest');

const serverUrl = 'http://localhost:5000';

const XLSX = require('xlsx');

function readExcelFile(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  return XLSX.utils.sheet_to_json(sheet);
}

test('GET /api/hello should return 200', async () => {
  const res = await request(serverUrl).get('/api/hello');
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Hello, World from the server!');
});

test('GET /api/v1/read-projects should return 200', async () => {
  const res = await request(serverUrl).get('/api/v1/read-projects');
  expect(res.statusCode).toBe(200);
});

test('GET /api/v1/read-projects should return expected JSON', async () => {
  const excelData = readExcelFile('../data/projects.xlsx');

  const res = await request(serverUrl).get('/api/v1/read-projects');
  
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(expect.arrayContaining(excelData));
  res.body.forEach((row, index) => {
    expect(row.name).toBe(excelData[index].name);
    expect(row.age).toBe(excelData[index].age);
    expect(row.city).toBe(excelData[index].city);
  });
});
