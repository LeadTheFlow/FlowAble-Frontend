import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  /* 스타일링 내용을 추가하세요 */
`;

const ResultModel = ({ data, closeModal, cameraType }) => {
  return (
    <ModalContainer>
      {cameraType === 'ColorDetection' && (
        <div>
          <p>Color Detection 결과:</p>
          <p>{data.isColor}</p>
          <p>{data.message}</p>
        </div>
      )}

      {cameraType === 'ProductOCR' && (
        <div>
          <p>Product OCR 결과:</p>
          <p>{data.brand}</p>
          <p>{data.size}</p>
        </div>
      )}

      {/* 추가적인 결과 타입이 있다면 여기에 계속 추가할 수 있습니다. */}

      <button onClick={closeModal}>닫기</button>
    </ModalContainer>
  );
};

export default ResultModel;
