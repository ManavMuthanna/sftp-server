import { useEffect, useState } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data } = await axios.get('/api/files');
      setFiles(data);
    };

    fetchFiles();
  }, []);

  const handleDelete = async (filePath) => {
    await axios.delete(`/api/files?remotePath=${filePath}`);
    setFiles(files.filter(file => file.name !== filePath));
  };

  return (
    <div>
      <h1>File List</h1>
      <ul>
        {files.map(file => (
          <li key={file.name}>
            {file.name}
            <button onClick={() => handleDelete(file.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
