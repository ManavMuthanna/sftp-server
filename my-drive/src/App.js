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

  const handleConnect = (message) => {
    console.log(message);
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

  return (
    <div className="App">
      <h1>SFTP Client</h1>
      {!isConnected ? (
        <Connect onConnect={handleConnect} />
      ) : (
        <div>
          <FileList path={path} />
          <Upload />
          <Download />
          <Delete />
          <LogOut onDisConnect={handleDisconnect} />
        </div>
      )}
    </div>
  );
};

export default App;
