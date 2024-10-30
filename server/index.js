const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const sftpClient = require('./sftp');
const path = require('path');

const app = express();
const upload = multer(); 

const port = process.env.PORT || 5000;

// Enable CORS from all origins
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' })); // Adjust limit as per your file size needs
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Endpoint to get the status of the api
app.get('/api/sftp', async (req, res) => {
  try {
    res.status(200).json({ message: "Hello, world! This is the myDrive (SFTP) API" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to connect to the SFTP server
app.post('/api/sftp/connect', async (req, res) => {
  try {
    const response = await sftpClient.connect();
    res.json({ message: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to get the status of the current directory
app.get('/api/sftp/status', async (req, res) => {
  try {
    const response = await sftpClient.getStatus();
    res.json({ message: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to get a list of files and directories in a specific path
app.post('/api/sftp/list', async (req, res) => {
  const { path } = req.body;

  if (!path) {
    return res.status(400).json({ message: 'Path is required' });
  }

  try {
    const response = await sftpClient.getList(path);
    res.json({ message: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Endpoint to upload a file to the SFTP server
app.post('/api/sftp/upload', upload.single('file'), async (req, res) => {
  const file = req.file; // Uploaded file object
  const remotePath = req.body.remotePath; // Remote path from the request body

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const contentBuffer = file.buffer; // Buffer containing file content
    const response = await sftpClient.uploadFile(contentBuffer, remotePath);
    res.json({ message: response });
  } catch (err) {
    console.error('Server upload error:', err.message);
    res.status(500).json({ message: 'Failed to upload file' });
  }
});

// Endpoint to download a file from the SFTP server
app.post('/api/sftp/download', async (req, res) => {
  const { remotePath } = req.body;
  
  if (!remotePath) {
    return res.status(400).json({ message: 'Remote path is required' });
  }

  try {
    const fileData = await sftpClient.downloadFile(remotePath);
    
    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(remotePath)}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', fileData.length);
    
    // Send the file data
    res.send(fileData);
    
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ message: err.message });
  }
});


// Endpoint to remove a file from the SFTP server
app.delete('/api/sftp/delete', async (req, res) => {
  const { remotePath } = req.body;

  if (!remotePath) {
    return res.status(400).json({ message: 'Remote path is required' });
  }

  try {
    const response = await sftpClient.removeFile(remotePath);
    res.json({ message: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to create a new directory on the SFTP server
app.post('/api/sftp/create-directory', async (req, res) => {
  const { remotePath } = req.body;

  if (!remotePath) {
    return res.status(400).json({ message: 'Remote path is required' });
  }

  try {
    const response = await sftpClient.createDirectory(remotePath);
    res.json({ message: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to remove a directory from the SFTP server
app.delete('/api/sftp/remove-directory', async (req, res) => {
  const { remotePath } = req.body;

  if (!remotePath) {
    return res.status(400).json({ message: 'Remote path is required' });
  }

  try {
    const response = await sftpClient.removeDirectory(remotePath);
    res.json({ message: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to disconnect from the SFTP server
app.get('/api/sftp/disconnect', async (req, res) => {
  try {
    const response = await sftpClient.disconnect();
    res.json({ message: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
