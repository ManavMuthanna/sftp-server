// src/components/FileList.js
import React, {
  useState,
  useEffect
} from 'react';
import {
  getList
} from '../api';
import Delete from './Delete';
import Download from './Download';
import {
  FaFile,
  FaFolder
} from 'react-icons/fa';
import './FileList.css';

const FileList = ({
  path,
  refreshKey,
  onDelete,
  onDirectoryChange
}) => {
  const [files, setFiles] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const updateBreadcrumbs = () => {
      const parts = path.split('/');
      const newBreadcrumbs = [];
      let currentPath = '';
      for (let part of parts) {
        currentPath += part;
        newBreadcrumbs.push({
          name: part,
          path: currentPath
        });
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
  }, [path, refreshKey]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleDirectoryClick = (directoryName) => {
    onDirectoryChange(`${path}/${directoryName}`);
  };

  const handleBackClick = () => {
    if (breadcrumbs.length > 1) {
      const parentPath = breadcrumbs[breadcrumbs.length - 2].path;
      onDirectoryChange(parentPath);
    }
  };

  return ( <
      div style = {
        styles.container
      } >
      <
      div style = {
        styles.breadcrumbContainer
      } >
      <
      h2 style = {
        styles.breadcrumbs
      } > {
        breadcrumbs.map((breadcrumb, index) => ( <
            span key = {
              breadcrumb.path
            } >
            <
            button className = "breadcrumb-link"
            onClick = {
              () => onDirectoryChange(breadcrumb.path)
            }
            style = {
              styles.breadcrumbButton
            } > {
              breadcrumb.name
            } <
            /button> {
            index !== breadcrumbs.length - 1 && ' > '
          } <
          /span>
        ))
    } <
    /h2> < /
    div > <
    button onClick = {
      handleBackClick
    }
  disabled = {
    breadcrumbs.length <= 1
  }
  style = {
      styles.backButton
    } >
    Back <
    /button> <
  div style = {
      styles.tableWrapper
    } >
    <
    table style = {
      styles.table
    } >
    <
    thead >
    <
    tr >
    <
    th > Name < /th> <
  th > Size < /th> <
  th > Last Modified < /th> <
  th > Last Accessed < /th> <
  th > Actions < /th> < /
    tr > <
    /thead> <
  tbody > {
      files.length === 0 ? ( <
        tr >
        <
        td colSpan = "5"
        style = {
          styles.noFilesMessage
        } >
        No file / folders found, upload some!
        <
        /td> < /
        tr >
      ) : (
        files.map((file) => ( <
          tr key = {
            file.name
          } >
          <
          td > {
            file.type === 'd' ? ( <
              button className = "directory-link"
              onClick = {
                () => handleDirectoryClick(file.name)
              }
              style = {
                styles.directoryButton
              } >
              <
              FaFolder / > {
                file.name
              } <
              /button>
            ) : ( <
              >
              <
              FaFile / > {
                file.name
              } <
              />
            )
          } <
          /td> <
          td > {
            file.size
          }
          bytes < /td> <
          td > {
            formatDate(file.modifyTime)
          } < /td> <
          td > {
            formatDate(file.accessTime)
          } < /td> <
          td style = {
            styles.actionButtons
          } > {
            file.type !== 'd' && ( <
              Download path = {
                path
              }
              fileName = {
                file.name
              }
              />
            )
          } <
          Delete path = {
            path
          }
          fileName = {
            file.name
          }
          onDelete = {
            onDelete
          }
          /> < /
          td > <
          /tr>
        ))
      )
    } <
    /tbody> < /
    table > <
    /div> < /
    div >
);
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f7fa',
    minHeight: '100vh',
  },
  breadcrumbContainer: {
    marginBottom: '20px',
  },
  breadcrumbs: {
    fontSize: '18px',
    color: '#555',
    margin: '0',
  },
  breadcrumbButton: {
    color: '#007bff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  backButton: {
    backgroundColor: '#f4f7fa',
    color: '#007bff',
    border: '1px solid #007bff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'background-color 0.3s ease',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f7f7f7',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  noFilesMessage: {
    textAlign: 'center',
    color: '#999',
    padding: '20px',
    fontStyle: 'italic',
  },
  directoryButton: {
    background: 'none',
    border: 'none',
    color: '#28a745',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
};

export default FileList;