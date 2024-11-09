// src/components/CreateDirectory.js
import React, { useState } from 'react';
import { createDirectory } from '../api';
import './CreateDirectory.css'; // Import the CSS file

const CreateDirectory = ({ path, onCreate }) => {
  const [directoryName, setDirectoryName] = useState('');

  const handleCreate = async () => {
    if (!directoryName) {
      alert('Please enter a directory name');
      return;
    }

    try {
      const response = await createDirectory(`${path}/${directoryName}`);
      alert(response.data.message);
      onCreate(); // Notify parent component that directory creation is done
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mkdir-container">
      <h2 className="mkdir-heading">Create a New Directory</h2>
      <input
        type="text"
        placeholder="Enter Directory Name"
        value={directoryName}
        onChange={(e) => setDirectoryName(e.target.value)}
        className="mkdir-input"
      />
      <button onClick={handleCreate} className="mkdir-button">
        Create
      </button>
    </div>
  );
};

export default CreateDirectory;
