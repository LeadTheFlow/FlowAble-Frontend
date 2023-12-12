import React from 'react';
import styled from 'styled-components';
import loadingGIF from '../assets/work-in-progress.gif';

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
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
`;

const GIFImage = styled.img`
  width: 200px;
  height: 200px;
`;

const LoadingModal = () => {
  return (
    <ModalBackground>
      <ModalContainer>
        <GIFImage src={loadingGIF} alt="Loading" width="50" height="50" />
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoadingModal;
