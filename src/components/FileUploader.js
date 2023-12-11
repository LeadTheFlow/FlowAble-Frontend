import React, { useState } from "react";
import axios from "axios";

const FileUploader = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log(formData);

      axios
        .post("http://127.0.0.1:5002/api/product/OCR", formData)
        .then((response) => {
          // 서버에서 받은 데이터를 사용
          console.log(response.data);
          onUpload(response.data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.error("Please select a file.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
