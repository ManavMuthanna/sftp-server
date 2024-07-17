// src/components/Connect.js
import React from 'react';
import { connect } from '../api';

const Connect = ({ onConnect }) => {
  const handleConnect = async () => {
    try {
      const response = await connect();
      onConnect(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleConnect}>Connect to SFTP</button>
  );
};

export default Connect;
