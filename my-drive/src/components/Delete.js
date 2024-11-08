// src/components/Delete.js
import React from 'react';
import {
  removeFile,
  removeDirectory
} from '../api';

const Delete = ({
  fileName,
  path,
  onDelete
}) => {
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

  return ( <
    div style = {
      styles.container
    } >
    <
    h2 style = {
      styles.heading
    } > Delete Item </h2> <
    p style = {
      styles.subheading
    } > You are about to delete <strong > {
      fileName
    } </strong></p >
    <
    button onClick = {
      handleDelete
    }
    style = {
      styles.button
    } > Delete </button> </div >
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '50px auto',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '15px',
  },
  subheading: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '25px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#FF4D4D', // Red color for delete action
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#FF1F1F', // Darker red on hover
  },
};

export default Delete;