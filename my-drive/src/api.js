import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const api = axios.create({
  baseURL: BACKEND_URL, // Replace with your backend URL
});

export const connect = () => api.post('/connect');
export const getStatus = () => api.get('/status');
export const getList = (path) => api.post('/list', { path });
export const uploadFile = (fileContent, remotePath) => api.post('/upload', { fileContent, remotePath });
export const downloadFile = (remotePath) => api.post('/download', { remotePath }, { responseType: 'blob' });
export const removeFile = (remotePath) => api.delete('/delete', { data: { remotePath } });
export const disconnect = () => api.get('/disconnect');
export const createDirectory = (remotePath) => api.post('/create-directory', { remotePath });
export const removeDirectory = (remotePath) => api.delete('/remove-directory', { data: { remotePath } });


export default api;
