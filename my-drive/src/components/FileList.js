import React, { useState, useEffect } from 'react';
import { getList } from '../api';
import Delete from './Delete';
import Download from './Download';

const FileList = ({ path, refreshKey, onDelete }) => {
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
      <h2>{path.replace('%2F', ' > ')}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Last Modified</th>
            <th>Last Accessed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((file) => (
              <tr key={file.name}>
                <td>{file.name}</td>
                <td>{file.size} bytes</td>
                <td>{formatDate(file.modifyTime)}</td>
                <td>{formatDate(file.accessTime)}</td>
                <td>
                  <Download fileName={file.name} />
                  <Delete fileName={file.name} onDelete={onDelete} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No file/folders found, upload some!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
