import React, { useState } from 'react';
import Connect from './components/Connect';
import FileList from './components/FileList';
import Upload from './components/Upload';
import Download from './components/Download';
import LogOut from './components/LogOut';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [path, setPath] = useState('upload%2FManav');
  const [refreshKey, setRefreshKey] = useState(0); // New state to handle refresh

  const handleConnect = (message) => {
    if (message === "connect: An existing SFTP connection is already defined") {
      // Handle existing connection case
    } else {
      alert(message);
      setIsConnected(true);
    }
  };

  const handleDisconnect = (message) => {
    alert(message);
    setIsConnected(false);
  };

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Update refresh key to trigger re-render
  };

  return (
    <div className="App">
      <h1>SFTP Client</h1>
      {!isConnected ? (
        <Connect onConnect={handleConnect} />
      ) : (
        <div>
          <FileList path={path} refreshKey={refreshKey} onDelete={handleRefresh} />
          <Upload onUpload={handleRefresh} />
          <LogOut onDisConnect={handleDisconnect} />
        </div>
      )}
    </div>
  );
};

export default App;
