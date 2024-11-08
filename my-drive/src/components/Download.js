// src/components/Download.js
import React from 'react';
import {
  downloadFile
} from '../api';

const Download = ({
  fileName,
  path
}) => {
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

  return ( <
    div style = {
      styles.container
    } >
    <
    h2 style = {
      styles.heading
    } > Download File </h2> <
    p style = {
      styles.subheading
    } > Click the button below to download < strong > {
      fileName
    } </strong></p>
    <
    button onClick = {
      handleDownload
    }
    style = {
      styles.button
    } > Download </button> </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#f0f4f8',
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
    backgroundColor: '#007BFF', // Blue color for the download button
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3', // Darker blue on hover
  },
};

export default Download;
