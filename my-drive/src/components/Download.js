import React from 'react';
import { downloadFile } from '../api';

const Download = ({ fileName, path }) => {
  const handleDownload = async () => {
    try {
      const remotePath = `${path}/${fileName}`;
      const response = await downloadFile(remotePath);
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
    <button onClick={handleDownload}>Download</button>
  );
};

export default Download;
