import React, { useState } from 'react';
import Connect from './components/Connect';
import FileList from './components/FileList';
import Upload from './components/Upload';
import CreateDirectory from './components/CreateDirectory';
import LogOut from './components/LogOut';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [path, setPath] = useState('upload/Manav');
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
    setPath('upload/Manav'); // Reset path to default or initial state
    setRefreshKey((prevKey) => prevKey + 1); // Reset refreshKey to trigger re-render
  };

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Update refresh key to trigger re-render
  };

  const handleDirectoryChange = (newPath) => {
    setPath(newPath);
    handleRefresh();
  };

  return (
    <div className="App">
      <h1>SFTP Client</h1>
      {!isConnected ? (
        <Connect onConnect={handleConnect} />
      ) : (
        <div>
          <FileList path={path} refreshKey={refreshKey} onDelete={handleRefresh} onDirectoryChange={handleDirectoryChange} />
          <Upload path={path} onUpload={handleRefresh} />
          <CreateDirectory path={path} onCreate={handleRefresh} />
          <LogOut onDisConnect={handleDisconnect} />
        </div>
      )}
    </div>
  );
};

export default App;
