// src/components/Delete.js
import React, { useState } from 'react';
import { removeFile } from '../api';

const Delete = () => {
  const [path, setPath] = useState('upload%2FManav%2F');
  const [fileName, setFileName] = useState('');
  const handleDelete = async () => {
    try {
      const response = await removeFile(path + fileName);
      alert(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Delete File</h2>
      <input
        type="text"
        placeholder="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Delete;
