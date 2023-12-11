import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = ({ setData, endpoint }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadTest = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .post(`http://127.0.0.1:${endpoint}`, formData)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error uploading image', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadTest}>Upload</button>
    </div>
  );
};

export default FileUploader;
