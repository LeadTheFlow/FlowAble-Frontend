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
        <div>
          <p>생리혈 확인 유무 카메라</p>
          <p>화면을 클릭해주세요</p>
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
        </div>
      )}
      {cameraType === 'ProductOCR' && (
        <div>
          <p>생리대 제품 인식 카메라</p>
          <p>화면을 클릭해주세요</p>
          <FileUploader setData={setData} endpoint="5002/api/OCR" />
          {isModalOpen && (
            <ResultModal
              data={responseValue}
              closeModal={closeModal}
              cameraType={cameraType}
            />
          )}
        </div>
      )}

      {cameraType === 'TrashcanDetection' && (
        <div>
          <p>수거함 유무 인식 카메라</p>
          <p>화면을 클릭해주세요</p>
          <FileUploader setData={setData} endpoint="5004/api/detectTrash" />
          {isModalOpen && (
            <ResultModal
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
