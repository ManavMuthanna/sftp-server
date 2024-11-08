import React, {
  useState
} from 'react';
import {
  createDirectory
} from '../api';

const CreateDirectory = ({
  path,
  onCreate
}) => {
  const [directoryName, setDirectoryName] = useState('');

  const handleCreate = async () => {
    if (!directoryName) {
      alert('Please enter a directory name');
      return;
    }

    try {
      const response = await createDirectory(`${path}/${directoryName}`);
      alert(response.data.message);
      onCreate(); // Notify parent component that directory creation is done
    } catch (err) {
      console.error(err);
    }
  };

  return ( <div style = {
      styles.container
    } >
    <
    h2 style = {
      styles.heading
    } > Create a New Directory </h2> <
    input type = "text"
    placeholder = "Enter Directory Name"
    value = {
      directoryName
    }
    onChange = {
      (e) => setDirectoryName(e.target.value)
    }
    style = {
      styles.input
    }
    /> <button onClick = {
      handleCreate
    }
    style = {
      styles.button
    } > Create </button> </div >
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px 24px',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default CreateDirectory;