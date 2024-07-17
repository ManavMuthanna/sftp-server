const Client = require('ssh2-sftp-client');
const sftp = new Client();

const sftpConfig = {
  host: process.env.NEXT_PUBLIC_SFTP_HOST,
  port: process.env.NEXT_PUBLIC_SFTP_PORT, // default is 22
  username: process.env.NEXT_PUBLIC_SFTP_USERNAME,
  password: process.env.NEXT_PUBLIC_SFTP_PASSWORD,
};

const connect = async () => {
  try {
    await sftp.connect(sftpConfig);
  } catch (error) {
    console.error('Error connecting to SFTP:', error.message);
    throw new Error('SFTP connection failed');
  }
};

const listFiles = async (path = '/') => {
  try {
    await connect();
    const files = await sftp.list(path);
    await sftp.end();
    return files;
  } catch (error) {
    console.error('Error listing files:', error.message);
    throw new Error('Failed to list files');
  }
};

const uploadFile = async (localPath, remotePath) => {
  try {
    await connect();
    await sftp.put(localPath, remotePath);
    await sftp.end();
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw new Error('Failed to upload file');
  }
};

const downloadFile = async (remotePath, localPath) => {
  try {
    await connect();
    await sftp.get(remotePath, localPath);
    await sftp.end();
  } catch (error) {
    console.error('Error downloading file:', error.message);
    throw new Error('Failed to download file');
  }
};

const deleteFile = async (remotePath) => {
  try {
    await connect();
    await sftp.delete(remotePath);
    await sftp.end();
  } catch (error) {
    console.error('Error deleting file:', error.message);
    throw new Error('Failed to delete file');
  }
};

module.exports = {
  listFiles,
  uploadFile,
  downloadFile,
  deleteFile,
};
