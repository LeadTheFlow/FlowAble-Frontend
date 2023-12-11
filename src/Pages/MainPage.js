import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StyledButton from "../components/StyledButton";

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainPage = () => {
  const navigate = useNavigate();

  function moveToPage(moveTo) {
    navigate("/Pages/" + moveTo);
  }

  return (
    <MainContainer>
      <StyledButton
        value="Calendar"
        onClick={() => moveToPage("Calendar/Selection")}
      >
        달력 기록
      </StyledButton>
      <StyledButton value="Product" onClick={() => moveToPage("Product")}>
        생리대 선택
      </StyledButton>
      <StyledButton value="Restroom" onClick={() => moveToPage("Restroom")}>
        화장실 환경
      </StyledButton>
    </MainContainer>
  );
};

export default MainPage;
