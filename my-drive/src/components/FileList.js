import React, { useState, useEffect } from 'react';
import { getList } from '../api';
import Delete from './Delete';
import Download from './Download';
import { FaFile, FaFolder } from 'react-icons/fa';
import './FileList.css'; 

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
    <div className="filelist-container">
      <div className="breadcrumb-container">
        <h2 className="breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={breadcrumb.path}>
            <button
              className={`breadcrumb-link ${index === breadcrumbs.length - 1 ? 'current-directory' : ''}`}
              onClick={() => onDirectoryChange(breadcrumb.path)}
            >
              {breadcrumb.name}
            </button>
            {index !== breadcrumbs.length - 1 && ' > '}
          </span>
          ))}
        </h2>
      </div>
      <div className='backbutton-container'>
        <button onClick={handleBackClick} disabled={breadcrumbs.length <= 1} className="back-button">
          Back
        </button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr className="table-header">
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
                <td colSpan="5" className="no-files-message">
                  No file/folders found, upload some!
                </td>
              </tr>
            ) : (
              files.map((file) => (
                <tr key={file.name}>
                  <td className="table-cell">
                    {file.type === 'd' ? (
                      <button
                        className="directory-link"
                        onClick={() => handleDirectoryClick(file.name)}
                      >
                        <FaFolder /> <span className='file-name'>{file.name}</span>
                      </button>
                    ) : (
                      <>
                        <FaFile /> {file.name}
                      </>
                    )}
                  </td>
                  <td className="table-cell">{file.size} bytes</td>
                  <td className="table-cell">{formatDate(file.modifyTime)}</td>
                  <td className="table-cell">{formatDate(file.accessTime)}</td>
                  <td className="table-cell action-buttons">
                    {file.type !== 'd' && <Download path={path} fileName={file.name} />}
                    <Delete path={path} fileName={file.name} onDelete={onDelete} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
