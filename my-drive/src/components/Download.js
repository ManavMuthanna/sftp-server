// src/components/Download.js
import React, { useState } from 'react';
import { downloadFile } from '../api';

const Download = () => {
  const [remotePath, setRemotePath] = useState('upload%2FManav%2F');
  const [fileName, setFileName] = useState('');
  const handleDownload = async () => {
    try {
      const response = await downloadFile(remotePath + fileName); // Concatenate remotePath and fileName
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Download File</h2>
      <input
        type="text"
        placeholder="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Download;
