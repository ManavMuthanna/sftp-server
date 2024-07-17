const express = require('express');
const bodyParser = require('body-parser');
const sftpClient = require('./sftp'); // Assuming sftp.js is renamed to sftp.js
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

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
app.get('/api/sftp/list/:path', async (req, res) => {
  const { path } = req.params;
  try {
    const response = await sftpClient.getList(path);
    res.json({ message: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to upload a file to the SFTP server
app.post('/api/sftp/upload', async (req, res) => {
  const { localPath, remotePath } = req.body;
  try {
    const response = await sftpClient.uploadFile(localPath, remotePath);
    res.json({ message: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/sftp/download/:remotePath', async (req, res) => {
  const { remotePath } = req.params;
  
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
app.delete('/api/sftp/delete/:path', async (req, res) => {
  const { path } = req.params;
  try {
    const response = await sftpClient.removeFile(path);
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