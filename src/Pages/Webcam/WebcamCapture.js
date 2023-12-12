import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled.button`
  margin-top: 20px;
`;

// WebcamComponent + fileUploader

const WebcamCapture = ({ endpoint, onLoading, setData }) => {
  const webcamRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const captureAndUpload = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      // Convert base64/URLEncoded data component to raw binary data held in a string
      let byteString;
      if (imageSrc.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(imageSrc.split(',')[1]);
      else byteString = unescape(imageSrc.split(',')[1]);

      // Separate out the mime component and construct a Blob from the byteString
      const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], { type: mimeString });

      // Use FormData to send the captured image file
      const formData = new FormData();
      formData.append('file', blob);

      onLoading && onLoading(true);
      setIsUploading(true);

      // Post the image to the server endpoint
      axios
        .post(`http://127.0.0.1:${endpoint}`, formData)
        .then((response) => {
          console.log(response.data);
          setData && setData(response.data);
        })
        .catch((error) => {
          console.error('Error uploading image', error);
        })
        .finally(() => {
          onLoading && onLoading(false);
          setIsUploading(false);
        });
    }
  }, [webcamRef, endpoint, onLoading, setData]);

  const videoConstraints = {
    aspectRatio: 0.6666666667,
    facingMode: 'user',
    width: { min: 480 },
    height: { min: 720 },
  };

  return (
    <Container>
      <Webcam
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        audio={false}
        height={500}
        width={500}
        ref={webcamRef}
        mirrored={false}
      />
      <Button onClick={captureAndUpload} disabled={isUploading}>
        {isUploading ? 'Uploading…' : 'Capture & Upload'}
      </Button>
    </Container>
  );
};

export default WebcamCapture;
