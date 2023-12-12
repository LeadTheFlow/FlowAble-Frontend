import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import styled from 'styled-components';
import ModalButton from '../../components/ModalButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

// WebcamComponent + fileUploader

const WebcamCapture = ({ endpoint, onLoading, setData }) => {
  const webcamRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const captureAndUpload = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      // base64/URLEncoded 이미지를 raw binary로 변환
      let byteString;
      if (imageSrc.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(imageSrc.split(',')[1]);
      else byteString = unescape(imageSrc.split(',')[1]);

      const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], { type: mimeString });

      // formData에 담기
      const formData = new FormData();
      formData.append('file', blob);

      onLoading && onLoading(true);
      setIsUploading(true);

      // Post 요청
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
      {isUploading ? (
        <img
          src={capturedImage}
          alt="Captured"
          style={{ width: 500, height: 500 }}
        />
      ) : (
        <Webcam
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          audio={false}
          height={500}
          width={500}
          ref={webcamRef}
          mirrored={false}
        />
      )}
      <ModalButton onClick={captureAndUpload} disabled={isUploading}>
        {isUploading ? '업로드 중 ...' : '촬영 및 업로드'}
      </ModalButton>
    </Container>
  );
};

export default WebcamCapture;
