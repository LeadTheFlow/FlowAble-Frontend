import React, { useState } from "react";

const FileUploadHandler = () => {
  const [imageURL, setImageURL] = useState("");

  const handleUploadImage = (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", uploadInput.files[0]);
    data.append("filename", fileName.value);

    fetch("http://127.0.0.1:5002/api/product/OCR", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        setImageURL(`http://127.0.0.1:5002/api/product/OCR${body.file}`);
      });
    });
  };

  let uploadInput, fileName;

  return (
    <form onSubmit={handleUploadImage}>
      <div>
        <input
          ref={(ref) => {
            uploadInput = ref;
          }}
          type="file"
        />
      </div>
      <div>
        <input
          ref={(ref) => {
            fileName = ref;
          }}
          type="text"
          placeholder="Enter the desired name of file"
        />
      </div>
      <br />
      <div>
        <button>Upload</button>
      </div>
      <img src={imageURL} alt="img" />
    </form>
  );
};

export default FileUploadHandler;
