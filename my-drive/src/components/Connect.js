// src/components/Connect.js
import React from 'react';
import {
  connect
} from '../api';

const Connect = ({
  onConnect
}) => {
  const handleConnect = async () => {
    try {
      const response = await connect();
      onConnect(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return ( <
    div style = {
      styles.container
    } >
    <
    h1 style = {
      styles.heading
    } > Welcome to the SFTP Server </h1> <
    p style = {
      styles.subheading
    } > Click below to connect securely </p> <
    button onClick = {
      handleConnect
    }
    style = {
      styles.button
    } > Connect to SFTP </button> </div >
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f4f8',
    padding: '20px',
  },
  heading: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Connect;