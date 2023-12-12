import React from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* 어둡게 하려면 투명도를 조절합니다. */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 다른 모달 등과 겹치지 않게 큰 값으로 설정합니다. */
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
`;

const LoadingModal = () => {
  return (
    <ModalBackground>
      <ModalContainer>
        <img
          src={logo} /* 로딩 GIF 이미지 경로를 설정합니다. */
          alt="Loading"
          width="50"
          height="50"
        />
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoadingModal;
