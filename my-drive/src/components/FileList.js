import React, { useState, useEffect } from 'react';
import { getList } from '../api';

const FileList = ({ path, refreshKey }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getList(path);
        setFiles(response.data.message);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFiles();
  }, [path, refreshKey]); // Depend on both path and refreshKey

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div>
      <h2>Files in {path.replace('%2F', '/')}</h2>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <div>
              <strong>Name:</strong> {file.name}
            </div>
            <div>
              <strong>Size:</strong> {file.size} bytes
            </div>
            <div>
              <strong>Last Modified:</strong> {formatDate(file.modifyTime)}
            </div>
            <div>
              <strong>Last Accessed:</strong> {formatDate(file.accessTime)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
