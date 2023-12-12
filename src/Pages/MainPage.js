import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton';
import FlowAbleLogo from '../assets/FlowAbleLogo.png';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  max-width: 100px;
`;

const MainPage = () => {
  const navigate = useNavigate();

  function moveToPage(moveTo) {
    navigate('/Pages/' + moveTo);
  }

  const moveToCameraPage = (moveTo, cameraType) => {
    navigate(`/Pages/${moveTo}`, { state: { cameraType } });
  };

  return (
    <MainContainer>
      <LogoImg src={FlowAbleLogo} />
      <StyledButton
        value="Product"
        onClick={() => moveToCameraPage('Camera', 'ProductOCR')}
      >
        생리대 인식
      </StyledButton>
      <StyledButton
        value="Calendar"
        onClick={() => moveToPage('Calendar/Selection')}
      >
        달력 기록
      </StyledButton>

      <StyledButton
        value="Restroom"
        onClick={() => moveToCameraPage('Camera', 'TrashcanDetection')}
      >
        화장실 환경
      </StyledButton>
    </MainContainer>
  );
};

export default MainPage;
