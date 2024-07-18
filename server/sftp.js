const dotenv = require('dotenv');
dotenv.config();

const Client = require('ssh2-sftp-client');

const SFTP_HOST = process.env.SFTP_HOST;
const SFTP_PORT = process.env.SFTP_PORT;
const SFTP_USERNAME = process.env.SFTP_USERNAME;
const SFTP_PASSWORD = process.env.SFTP_PASSWORD;

if (!SFTP_HOST || !SFTP_PORT || !SFTP_USERNAME || !SFTP_PASSWORD) {
  throw new Error('SFTP configuration is incomplete. Please check your .env file.');
}

async function createConnection() {
  const sftp = new Client();
  try {
    await sftp.connect({
      host: SFTP_HOST,
      port: parseInt(SFTP_PORT, 10),
      username: SFTP_USERNAME,
      password: SFTP_PASSWORD,
    });
    return sftp;
  } catch (err) {
    console.error('SFTP connection error:', err);
    throw err;
  }
}

async function uploadFile(fileContent, remotePath) {
  const sftp = await createConnection();
  try {
    const contentBuffer = Buffer.from(fileContent, 'base64');
    await sftp.put(contentBuffer, remotePath);
    return 'File uploaded successfully';
  } catch (err) {
    console.error('Error uploading file:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

async function downloadFile(remotePath) {
  const sftp = await createConnection();
  try {
    const data = await sftp.get(remotePath);
    return data;
  } catch (err) {
    console.error('Error downloading file:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

async function removeFile(path) {
  const sftp = await createConnection();
  try {
    await sftp.delete(path);
    return 'File deleted successfully';
  } catch (err) {
    console.error('Error deleting file:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

async function getStatus() {
  const sftp = await createConnection();
  try {
    return await sftp.exists('.');
  } catch (err) {
    console.error('Error getting status:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

async function getList(path) {
  const sftp = await createConnection();
  try {
    return await sftp.list(path);
  } catch (err) {
    console.error('Error getting list:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

async function connect() {
  const sftp = await createConnection();
  try {
    return 'Connected to SFTP server';
  } catch (err) {
    console.error('Error connecting to SFTP server:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

async function disconnect() {
  const sftp = await createConnection();
  try {
    await sftp.end();
    return 'Disconnected from SFTP server';
  } catch (err) {
    console.error('Error disconnecting from SFTP server:', err.message);
    throw err;
  }
}

async function createDirectory(remotePath) {
  const sftp = await createConnection();
  try {
    await sftp.mkdir(remotePath, true);
    return 'Directory created successfully';
  } catch (err) {
    console.error('Error creating directory:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

async function removeDirectory(remotePath) {
  const sftp = await createConnection();
  try {
    const files = await sftp.list(remotePath);

    // Recursively delete all files and directories
    for (const file of files) {
      const filePath = `${remotePath}/${file.name}`;
      if (file.type === 'd') {
        await removeDirectory(filePath); // Recursively remove subdirectories
      } else {
        await sftp.delete(filePath); // Delete files
      }
    }

    await sftp.rmdir(remotePath);
    return 'Directory and its contents removed successfully';
  } catch (err) {
    console.error('Error removing directory:', err.message);
    throw err;
  } finally {
    await sftp.end();
  }
}

module.exports = {
  connect,
  getStatus,
  getList,
  uploadFile,
  downloadFile,
  removeFile,
  disconnect,
  createDirectory,
  removeDirectory
};
