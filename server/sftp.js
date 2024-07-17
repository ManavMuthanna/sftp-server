const dotenv = require('dotenv');
dotenv.config();

const Client = require('ssh2-sftp-client');

const sftp = new Client();

const SFTP_HOST = process.env.SFTP_HOST;
const SFTP_PORT = process.env.SFTP_PORT;
const SFTP_USERNAME = process.env.SFTP_USERNAME;
const SFTP_PASSWORD = process.env.SFTP_PASSWORD;

if (!SFTP_HOST || !SFTP_PORT || !SFTP_USERNAME || !SFTP_PASSWORD) {
  throw new Error('SFTP configuration is incomplete. Please check your .env file.');
}

console.log('SFTP_HOST:', process.env.SFTP_HOST);
console.log('SFTP_PORT:', process.env.SFTP_PORT);
console.log('SFTP_USERNAME:', process.env.SFTP_USERNAME);
  // Don't log the password in a production environment

async function connect() {
  try {
    await sftp.connect({
      host: SFTP_HOST,
      port: parseInt(SFTP_PORT, 10),
      username: SFTP_USERNAME,
      password: SFTP_PASSWORD
    });
    return 'Connected to SFTP server';
  } catch (err) {
    console.error('SFTP connection error:', err);
    return err.message;
  }
}

async function getStatus() {
  try {
    return sftp.exists('.');
  } catch (err) {
    return err.message;
  }
}

async function getList(path) {
  try {
    return sftp.list(path);
  } catch (err) {
    return err.message;
  }
}

async function uploadFile(localPath, remotePath) {
  try {
    return sftp.put(localPath, remotePath);
  } catch (err) {
    return err.message;
  }
}

async function downloadFile(remotePath, localPath) {
  try {
    return sftp.get(remotePath, localPath);
  } catch (err) {
    return err.message;
  }
}

async function removeFile(path) {
  try {
    return sftp.delete(path);
  } catch (err) {
    return err.message;
  }
}

async function disconnect() {
  try {
    await sftp.end();
    return 'Disconnected from SFTP server';
  } catch (err) {
    return err.message;
  }
}

module.exports = {
  connect,
  getStatus,
  getList,
  uploadFile,
  downloadFile,
  removeFile,
  disconnect
};
