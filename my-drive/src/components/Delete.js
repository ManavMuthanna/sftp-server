// src/components/Delete.js
import React from 'react';
import { removeFile, removeDirectory } from '../api';
import './Delete.css'; // Import the CSS file for styling

const Delete = ({ fileName, path, onDelete }) => {
  const handleDelete = async () => {
    // Confirm the delete action
    const confirmDelete = window.confirm(`Are you sure you want to delete ${fileName}?`);

    if (!confirmDelete) return;

    try {
      let response;
      // Check if the fileName contains an extension
      if (fileName.includes('.')) {
        // It is a file
        response = await removeFile(`${path}/${fileName}`);
      } else {
        // It is a directory
        response = await removeDirectory(`${path}/${fileName}`);
      }
      alert(response.data.message);
      onDelete(); // Notify parent component that deletion is done
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
  );
};

export default Delete;
