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
  const [resultValue, setResultValue] = useState();
  const [isColorDetection, setIsColorDetection] = useState(false);
  const [isProductOCR, setIsProductOCR] = useState(false);
  const [isRestroomDetection, setIsRestroomDetection] = useState(false);

  const setData = (value) => {
    setResultValue(value);
  };

  return (
    <CameraContainer>
      {cameraType === 'ColorDetection' && (
        <div>
          <p>생리혈 확인 유무 카메라</p>
          <p>화면을 클릭해주세요</p>
          <FileUploader endpoint="5001/api/color" />
          {isColorDetection && (
            <ResultModel setData={resultValue}></ResultModel>
          )}
        </div>
      )}
      {cameraType === 'ProductOCR' && (
        <div>
          <p>생리대 제품 인식 카메라</p>
          <p>화면을 클릭해주세요</p>
          <FileUploader setData={setData} endpoint="5002/api/OCR" />
          <p>result: {resultValue}</p>
        </div>
      )}
      {/* {cameraType === 'RestroomDetection' && (
        <div>
          <p>위생용품 수거함 인식 카메라</p>
          <p>화면을 클릭해주세요</p>
          <FileUploader setData={setData} endpoint="" />
          <p>result: {resultValue}</p>
        </div>
      )} */}
    </CameraContainer>
  );
};

export default CameraPage;
