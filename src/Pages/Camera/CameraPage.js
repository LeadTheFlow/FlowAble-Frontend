import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FileUploader from '../../components/FileUploader';
import styled from 'styled-components';
import ResultModal from '../../components/ResultModal';
import LoadingModal from '../../components/LoadingModal';

const CameraContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const CameraDiv = styled.div`
  text-align: center;
  margin: 10px;
`;

const CameraTitle = styled.p`
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 4dvh;

  ${(props) => {
    switch (props.value) {
      case 'Calendar':
        return 'background-color: #EC524B;';
      case 'Product':
        return 'background-color: #FFD600;';
      case 'Restroom':
        return 'background-color: #4C8DFF;';
      default:
        return 'background-color: #92D14F;';
    }
  }}
`;

const CameraPage = () => {
  const location = useLocation();
  const cameraType = location.state?.cameraType || 'Camera';
  const [responseValue, setResponseValue] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const setData = (value) => {
    setResponseValue(value);
    openModal(true);
  };

  const handleLoading = (value) => {
    setIsLoading(value);
  };

  return (
    <CameraContainer>
      {cameraType === 'ColorDetection' && (
        <CameraDiv>
          <CameraTitle value="Calendar">생리혈 확인 유무 카메라</CameraTitle>
          <CameraTitle value="Calendar">화면을 클릭해주세요</CameraTitle>
          <FileUploader
            setData={setData}
            endpoint="5001/api/color"
            onLoading={handleLoading}
          />
          {isLoading && <LoadingModal />}
          {isModalOpen && (
            <ResultModal
              data={responseValue}
              closeModal={closeModal}
              cameraType={cameraType}
            />
          )}
        </CameraDiv>
      )}
      {cameraType === 'ProductOCR' && (
        <CameraDiv>
          <CameraTitle value="Product">생리대 제품 인식 카메라</CameraTitle>
          <CameraTitle value="Product">화면을 클릭해주세요</CameraTitle>
          <FileUploader
            setData={setData}
            endpoint="5002/api/OCR"
            onLoading={handleLoading}
          />
          {isModalOpen && (
            <ResultModal
              data={responseValue}
              closeModal={closeModal}
              cameraType={cameraType}
            />
          )}
        </CameraDiv>
      )}

      {cameraType === 'TrashcanDetection' && (
        <CameraDiv>
          <CameraTitle value="Restroom">수거함 유무 인식 카메라</CameraTitle>
          <CameraTitle value="Restroom">화면을 클릭해주세요</CameraTitle>
          <FileUploader
            setData={setData}
            endpoint="5004/api/detectTrash"
            onLoading={handleLoading}
          />
          {isModalOpen && (
            <ResultModal
              data={responseValue}
              closeModal={closeModal}
              cameraType={cameraType}
            />
          )}
        </CameraDiv>
      )}
    </CameraContainer>
  );
};

export default CameraPage;
