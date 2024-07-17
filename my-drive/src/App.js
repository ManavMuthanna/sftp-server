import React, { useState } from 'react';
import Connect from './components/Connect';
import FileList from './components/FileList';
import Upload from './components/Upload';
import Download from './components/Download';
import Delete from './components/Delete';
import LogOut from './components/LogOut';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [path, setPath] = useState('upload%2FManav');
  const [refreshKey, setRefreshKey] = useState(0); // Add a key for refreshing FileList

  const handleConnect = (message) => {
    if (message == "connect: An existing SFTP connection is already defined") {
      
    } else {
      alert(message);
      setIsConnected(true);
    }
  };

  const handleDisconnect = (message) => {
    alert(message);
    setIsConnected(false);
  };

  const handleDelete = () => {
    // Refresh file list after delete
    setRefreshKey((prevKey) => prevKey + 1); // Update the refresh key
  };

  return (
    <div className="App">
      <h1>SFTP Client</h1>
      {!isConnected ? (
        <Connect onConnect={handleConnect} />
      ) : (
        <div>
          <FileList key={refreshKey} path={path} />
          <Upload />
          <Download />
          <Delete onDelete={handleDelete} />
          <LogOut onDisConnect={handleDisconnect} />
        </div>
      )}
    </div>
  );
};

export default App;
