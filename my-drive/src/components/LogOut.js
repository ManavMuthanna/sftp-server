// src/components/LogOut.js
import React from 'react';
import { disconnect } from '../api';
import './LogOut.css';

const LogOut = ({ onDisConnect }) => {
  const handleLogOut = async () => {
    try {
      const response = await disconnect();
      onDisConnect(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <button onClick={handleLogOut} className="logout-button">
        Log Out
      </button>
  );
};

export default LogOut;
