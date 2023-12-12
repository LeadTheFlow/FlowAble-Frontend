import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FileUploader from '../../components/FileUploader';
import styled from 'styled-components';
import ResultModel from '../../components/ResultModel';

const CameraContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const CameraPage = () => {
  const location = useLocation();
  const cameraType = location.state?.cameraType || 'Camera';
  const [responseValue, setResponseValue] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const setData = (value) => {
    setResponseValue(value);
    openModal(); // 데이터를 받아오면 모달을 엽니다.
  };

  return (
    <CameraContainer>
      {cameraType === 'ColorDetection' && (
        <div>
          <p>생리혈 확인 유무 카메라</p>
          <p>화면을 클릭해주세요</p>
          <FileUploader setData={setData} endpoint="5001/api/color" />
          {isModalOpen && (
            <ResultModel
              data={responseValue}
              closeModal={closeModal}
              cameraType={cameraType}
            />
          )}
        </div>
      )}
      {cameraType === 'ProductOCR' && (
        <div>
          <p>생리대 제품 인식 카메라</p>
          <p>화면을 클릭해주세요</p>
          <FileUploader setData={setData} endpoint="5002/api/OCR" />
          {isModalOpen && (
            <ResultModel
              data={responseValue}
              closeModal={closeModal}
              cameraType={cameraType}
            />
          )}
        </div>
      )}
    </CameraContainer>
  );
};

export default CameraPage;
