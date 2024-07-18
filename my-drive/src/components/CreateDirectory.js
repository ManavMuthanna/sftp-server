import React, { useState } from 'react';
import { createDirectory } from '../api';

const CreateDirectory = ({ onCreate }) => {
  const [directoryName, setDirectoryName] = useState('');

  const handleCreate = async () => {
    if (!directoryName) {
      alert('Please enter a directory name');
      return;
    }

    try {
      const response = await createDirectory(`upload/Manav/${directoryName}`);
      alert(response.data.message);
      onCreate(); // Notify parent component that directory creation is done
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Directory</h2>
      <input
        type="text"
        placeholder="Directory Name"
        value={directoryName}
        onChange={(e) => setDirectoryName(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateDirectory;
