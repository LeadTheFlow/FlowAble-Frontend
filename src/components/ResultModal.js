import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StyledButton from './StyledButton';
import ModalButton from './ModalButton';

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
  text-align: center;
  display: flex;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 70%;

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

const ResultTitle = styled.div`
  font-size: 1.5rem;
  padding: 10px;
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
            <ResultTitle>
              진단 결과:
              {data.message}
            </ResultTitle>
            <ModalButton
              value="Calendar"
              onClick={() => moveToPage('Calendar')}
            >
              달력 기록
            </ModalButton>
            <ModalButton value="Calendar" onClick={closeModal}>
              다시 찍기
            </ModalButton>
          </div>
        )}

        {cameraType === 'ProductOCR' && (
          <div>
            <ResultTitle>
              이 제품은 {data.brand}, 사이즈는 {data.size} 입니다
            </ResultTitle>
            <ModalButton value="Product" onClick={closeModal}>
              다시 찍기
            </ModalButton>
          </div>
        )}

        {cameraType === 'TrashcanDetection' && (
          <div>
            <ResultTitle>
              화면의 {data.position}에 수거함이 있습니다
            </ResultTitle>
            <ModalButton value="Restroom" onClick={closeModal}>
              다시 찍기
            </ModalButton>
          </div>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

export default ResultModal;
