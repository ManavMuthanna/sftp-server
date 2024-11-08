// src/components/Upload.js
import React, {
  useState
} from 'react';
import {
  uploadFile
} from '../api';

const Upload = ({
    path,
    onUpload
  }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
      if (!file) {
        alert('Please select a file to upload');
        return;
      }

      const formData = new FormData();
      formData.append('file', file); // Append the file to FormData
      formData.append('remotePath', `${path}/${file.name}`); // Append path from props and file name

      setLoading(true); // Show loading state

      try {
        const response = await uploadFile(formData);
        alert(response.data.message);
        onUpload(); // Notify parent component that upload is done
      } catch (err) {
        console.error('Upload failed:', err.message);
        if (err.response) {
          console.error('Server responded with:', err.response.data.toString());
        }
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    return ( <
      div className = "upload-container" >
      <
      h2 > Upload File < /h2> <
      div className = "upload-input" >
      <
      input type = "file"
      onChange = {
        handleFileChange
      }
      /> {
        file && < span > {
            file.name
          } < /span>} <
          /div> <
          button className = {
            `upload-button ${loading ? 'loading' : ''}`
          }
        onClick = {
          handleUpload
        }
        disabled = {
            loading
          } > {
            loading ? 'Uploading...' : 'Upload'
          } <
          /button>

          <
          style jsx > {
            `
        .upload-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f4f7fa;
          padding: 20px;
          min-height: 100vh;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .upload-container h2 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #555;
        }

        .upload-input {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .upload-input input {
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
          width: 100%;
          max-width: 300px;
        }

        .upload-input span {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
        }

        .upload-button {
          padding: 12px 25px;
          background-color: #4CAF50;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 100%;
          max-width: 300px;
        }

        .upload-button:hover {
          background-color: #45a049;
        }

        .upload-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .upload-button.loading {
          background-color: #ff9800;
        }

        @media (max-width: 768px) {
          .upload-container {
            padding: 10px;
          }

          .upload-button {
            width: 100%;
            max-width: 90%;
          }
        }
      `
          } < /style> <
          /div>
      );
    };

    export default Upload;
