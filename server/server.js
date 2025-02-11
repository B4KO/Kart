require('dotenv').config();
const express = require('express');
const axios = require('axios');
const XLSX = require('xlsx');
const { PublicClientApplication } = require('@azure/msal-node');

const app = express();
const port = process.env.PORT || 3000;

// In-memory token store for demonstration purposes
let accessToken = null;

// MSAL configuration for a public client using the device code flow for personal accounts
const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    // Use the /consumers endpoint for personal Microsoft accounts
    authority: "https://login.microsoftonline.com/consumers",
  },
};

const pca = new PublicClientApplication(msalConfig);

/**
 * Endpoint to initiate login via device code flow.
 * When you hit this endpoint, a device code message will be shown in the console.
 */
app.get('/login', async (req, res) => {
  const deviceCodeRequest = {
    scopes: ["Files.Read"], // Permission required to read OneDrive files
    deviceCodeCallback: (response) => {
      // Display the device code prompt details
      console.log(response.message);
    },
  };

  try {
    const tokenResponse = await pca.acquireTokenByDeviceCode(deviceCodeRequest);
    accessToken = tokenResponse.accessToken;
    res.send("Login successful! You can now access the /data endpoint.");
  } catch (error) {
    console.error("Error acquiring token via device code:", error);
    res.status(500).send("Error acquiring token");
  }
});

/**
 * Endpoint to download, parse, and return the Excel file as JSON.
 */
app.get('/data', async (req, res) => {
  if (!accessToken) {
    return res.status(401).send("Not authenticated. Please sign in via /login.");
  }

  try {
    // Construct the Graph API URL to access the file from the signed-in user's OneDrive.
    // The FILE_PATH must start with a forward slash.
    const filePath = process.env.FILE_PATH;
    const graphUrl = `https://graph.microsoft.com/v1.0/me/drive/root:${filePath}:/content`;

    // Download the Excel file as an arraybuffer.
    const fileResponse = await axios.get(graphUrl, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Parse the Excel workbook using XLSX.
    const workbook = XLSX.read(fileResponse.data, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    res.json(jsonData);
  } catch (error) {
    console.error(
        "Error retrieving or processing the Excel file:",
        error.response ? error.response.data : error
    );
    res.status(500).send("Error retrieving Excel data");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Visit http://localhost:${port}/login to sign in.`);
});
