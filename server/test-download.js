const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const serverUrl = 'http://localhost:3000'; // Replace with your server URL if different
const remotePath = 'upload/Manav/ex.jfif'; // Replace with the actual remote path
const saveDirectory = './tmp'; // Directory where files will be saved

// Ensure the save directory exists
if (!fs.existsSync(saveDirectory)) {
  fs.mkdirSync(saveDirectory, { recursive: true });
}

async function connectToServer() {
  try {
    const response = await axios.post(`${serverUrl}/api/sftp/connect`);
    console.log('Connected to server');
  } catch (error) {
    console.error('Connection to server failed:', error.message);
    throw error; // Rethrow error to handle it further if needed
  }
}

async function disconnectFromServer() {
  try {
    const response = await axios.get(`${serverUrl}/api/sftp/disconnect`);
    console.log('Disconnected from server');
  } catch (error) {
    console.error('Disconnection from server failed:', error.message);
    throw error; // Rethrow error to handle it further if needed
  }
}

async function downloadFile() {
  try {
    // Connect to server
    await connectToServer();

    // Download file
    const encodedPath = encodeURIComponent(remotePath);
    const response = await axios({
      method: 'get',
      url: `${serverUrl}/api/sftp/download/${encodedPath}`,
      responseType: 'arraybuffer'
    });

    const fileName = path.basename(remotePath);
    const filePath = path.join(saveDirectory, fileName);

    fs.writeFileSync(filePath, response.data);
    console.log(`File downloaded successfully: ${filePath}`);

    // Disconnect from server
    await disconnectFromServer();
  } catch (error) {
    console.error('Download failed:', error.message);
    if (error.response) {
      console.error('Server responded with:', error.response.data.toString());
    }
  }
}

// Execute the download process
downloadFile();
