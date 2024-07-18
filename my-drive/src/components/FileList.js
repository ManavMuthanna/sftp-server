import React, { useState, useEffect } from 'react';
import { getList } from '../api';
import Delete from './Delete';
import Download from './Download';

const FileList = ({ path, refreshKey, onDelete, onDirectoryChange }) => {
  const [files, setFiles] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const updateBreadcrumbs = () => {
      const parts = path.split('/');
      const newBreadcrumbs = [];
      let currentPath = '';
      for (let part of parts) {
        currentPath += part;
        newBreadcrumbs.push({ name: part, path: currentPath });
        currentPath += '/';
      }
      setBreadcrumbs(newBreadcrumbs);
    };

    const fetchFiles = async () => {
      try {
        const response = await getList(path);
        setFiles(response.data.message);
        updateBreadcrumbs();
      } catch (err) {
        console.error(err);
      }
    };

    fetchFiles();
  }, [path, refreshKey]); // Depend on path and refreshKey

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleDirectoryClick = (directoryName) => {
    onDirectoryChange(`${path}/${directoryName}`); // Update the path to navigate to the directory
  };

  const handleBackClick = () => {
    if (breadcrumbs.length > 1) {
      const parentPath = breadcrumbs[breadcrumbs.length - 2].path;
      onDirectoryChange(parentPath);
    }
  };

  return (
    <div>
      <h2>
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={breadcrumb.path}>
            <button
              className="breadcrumb-link"
              onClick={() => onDirectoryChange(breadcrumb.path)}
            >
              {breadcrumb.name}
            </button>
            {index !== breadcrumbs.length - 1 && ' > '}
          </span>
        ))}
      </h2>
      <button onClick={handleBackClick} disabled={breadcrumbs.length <= 1}>
        Back
      </button>
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
          {files.length === 0 ? (
            <tr>
              <td colSpan="5">No file/folders found, upload some!</td>
            </tr>
          ) : (
            files.map((file) => (
              <tr key={file.name}>
                <td>
                  {file.type === 'd' ? (
                    <button
                      className="directory-link"
                      onClick={() => handleDirectoryClick(file.name)}
                    >
                      {file.name}
                    </button>
                  ) : (
                    file.name
                  )}
                </td>
                <td>{file.size} bytes</td>
                <td>{formatDate(file.modifyTime)}</td>
                <td>{formatDate(file.accessTime)}</td>
                <td>
                  <Download fileName={file.name} />
                  <Delete path={path} fileName={file.name} onDelete={onDelete} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
