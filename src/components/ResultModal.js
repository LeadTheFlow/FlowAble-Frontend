import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 70%;
  text-align: center;

  div {
    margin-bottom: 15px;
  }

  p {
    margin: 5px 0;
  }

  .loading {
    font-size: 1.2em;
    margin-top: 10px;
  }
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ResultModal = ({ data, closeModal, cameraType }) => {
  const navigate = useNavigate();

  function moveToPage(moveTo) {
    navigate('/Pages/' + moveTo);
  }

  return (
    <ModalBackground>
      <ModalContainer>
        {cameraType === 'ColorDetection' && (
          <div>
            <p>Color Detection 결과:</p>
            <p>{data.isColor}</p>
            <p>{data.message}</p>
            <ModalButton onClick={() => moveToPage('Calendar')}>
              확인
            </ModalButton>
          </div>
        )}

        {cameraType === 'ProductOCR' && (
          <div>
            <p>Product OCR 결과:</p>
            <p>{data.brand}</p>
            <p>{data.size}</p>
          </div>
        )}

        {cameraType === 'TrashcanDetection' && (
          <div>
            <p>Trashcan Detection 결과:</p>
            <p>{data.position}</p>
          </div>
        )}
        <button onClick={closeModal}>닫기</button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ResultModal;
