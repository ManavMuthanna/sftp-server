import React from 'react';
import { disconnect } from '../api';

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
    <div>
      <h2>Disconnect from SFTP</h2>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default LogOut;
