import React, { useState } from 'react';
import Connect from './components/Connect';
import FileList from './components/FileList';
import Upload from './components/Upload';
import CreateDirectory from './components/CreateDirectory';
import LogOut from './components/LogOut';
import './App.css';
const SFTP_HOME_PATH = process.env.REACT_APP_SFTP_HOME_PATH 

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [path, setPath] = useState(SFTP_HOME_PATH);
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
    setPath(SFTP_HOME_PATH); // Reset path to default or initial state
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
      {!isConnected ? (
        <Connect onConnect={handleConnect} />
      ) : (
        <>
          <div className="navbar">
              <h1 className='header'>MyDrive Client</h1>
              <LogOut onDisConnect={handleDisconnect} />
          </div>
          <FileList path={path} refreshKey={refreshKey} onDelete={handleRefresh} onDirectoryChange={handleDirectoryChange} />
          <div className='file-functions'>
            <Upload path={path} refreshKey={refreshKey} onUpload={handleRefresh} />
            <CreateDirectory path={path} refreshKey={refreshKey} onCreate={handleRefresh} />
          </div>
          </>
      )}
    </div>
  );
};

export default App;
