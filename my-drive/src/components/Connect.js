// src/components/Connect.js
import React from 'react';
import { connect } from '../api';
import './Connect.css';

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
    <div className="welcome-container">
      <h1 className="heading">Welcome to MyDrive - A SFTP Client/Server Model</h1>
      <p className="subheading">Click below to connect securely</p>
      <button onClick={handleConnect} className="button">Connect to SFTP</button>
    </div>
  );
};

export default Connect;
