import React from 'react';
import { removeFile } from '../api';

const Delete = ({ fileName, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await removeFile(`upload%2FManav%2F${fileName}`);
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
