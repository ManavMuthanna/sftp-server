const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

// Configuration
const serverUrl = 'http://localhost:5000'; // Replace with your server URL if different
const localFilePath = './tmp/ex2.jfif'; // Replace with the actual local file path to upload
const remoteFolder = 'upload/Manav'; // Replace with the actual remote folder path where files will be uploaded

async function connectToServer() {
  try {
    const response = await axios.post(`${serverUrl}/api/sftp/connect`);
    console.log('Connected to server');
  } catch (error) {
    console.error('Connection to server failed:', error.message);
    throw error;
  }
}

async function uploadFile() {
  try {
    // Read local file content asynchronously
    const fileContent = await fs.readFile(localFilePath);

    // Extract local file name
    const fileName = path.basename(localFilePath);

    // Construct remote path with the same filename
    const remotePath = `${remoteFolder}/${fileName}`;

    // Connect to server
    await connectToServer();

    // Upload file
    const response = await axios({
      method: 'post',
      url: `${serverUrl}/api/sftp/upload`,
      data: {
        file: fileContent.toString('base64'), // Convert Buffer to base64 string
        remotePath: remotePath
      }
    });

    console.log('File uploaded successfully:', response.data.message);
  } catch (error) {
    console.error('Upload failed:', error.message);
    if (error.response) {
      console.error('Server responded with:', error.response.data.toString());
    }
  }
}

// Execute the upload process
uploadFile();
