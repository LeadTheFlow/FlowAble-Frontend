import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = ({ setData, endpoint, onLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadTest = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    onLoading(true);
    setIsUploading(true);

    axios
      .post(`http://127.0.0.1:${endpoint}`, formData)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        onLoading(false);
        setIsUploading(false);
      })
      .catch((error) => {
        console.error('Error uploading image', error);
      })
      .finally(() => {
        onLoading(false);
        setIsUploading(false);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadTest} disabled={isUploading}>
        업로드
      </button>
    </div>
  );
};

export default FileUploader;
