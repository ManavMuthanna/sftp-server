// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/sftp', // Replace with your backend URL
});

export const connect = () => api.post('/connect');
export const getStatus = () => api.get('/status');
export const getList = (path) => api.get(`/list/${path}`);
export const uploadFile = (fileContent, remotePath) => api.post('/upload', { fileContent, remotePath });
export const downloadFile = (remotePath) => api.get(`/download/${remotePath}`, { responseType: 'blob' });
export const removeFile = (path) => api.delete(`/delete/${path}`);
export const disconnect = () => api.get('/disconnect');

export default api;
