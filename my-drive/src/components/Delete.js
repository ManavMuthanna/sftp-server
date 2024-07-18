import React from 'react';
import { removeFile, removeDirectory } from '../api';

const Delete = ({ fileName, path, onDelete }) => {
  const handleDelete = async () => {
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
    <button onClick={handleDelete}>Delete</button>
  );
};

export default Delete;
