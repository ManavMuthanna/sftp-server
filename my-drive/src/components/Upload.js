// src/components/Upload.js
import React, { useState, useEffect } from 'react';
import { uploadFile } from '../api';
import './Upload.css'; // Import the CSS file

const Upload = ({ path, refreshKey, onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('remotePath', `${path}/${file.name}`);

    setLoading(true);

    try {
      const response = await uploadFile(formData);
      alert(response.data.message);
      onUpload();
    } catch (err) {
      console.error('Upload failed:', err.message);
      if (err.response) {
        console.error('Server responded with:', err.response.data.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset file and loading state when refreshKey changes
  useEffect(() => {
    setFile(null);
    setLoading(false);
  }, [refreshKey]);

  return (
    <div className="upload-container">
      <h2>Upload File</h2>
      <div className={`upload-input ${file ? 'file-selected' : ''}`}>
        <input key={refreshKey} type="file" onChange={handleFileChange} />
        {file && <span>{file.name}</span>}
      </div>
      <button
        className={`upload-button ${loading ? 'loading' : ''}`}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default Upload;
