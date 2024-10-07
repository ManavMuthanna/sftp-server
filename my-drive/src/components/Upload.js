import React, { useState } from 'react';
import axios from 'axios';
import { uploadFile } from '../api';

const Upload = ({ path, onUpload }) => {
  const [file, setFile] = useState(null);

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

    try {
      // const response = await axios.post('http://localhost:5000/api/sftp/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      const response = await uploadFile(formData);

      alert(response.data.message);
      onUpload(); // Notify parent component that upload is done
    } catch (err) {
      console.error('Upload failed:', err.message);
      if (err.response) {
        console.error('Server responded with:', err.response.data.toString());
      }
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
