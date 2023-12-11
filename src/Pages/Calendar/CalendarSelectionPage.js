import React from "react";
import StyledButton from "../../components/StyledButton";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CalendarSelectionContainer = styled.div`
  display: flex;
  height: 70vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CalendarSelectionPage = () => {
  const navigate = useNavigate();

  function moveToPage(moveTo) {
    navigate("/Pages/" + moveTo);
  }

  return (
    <CalendarSelectionContainer>
      <StyledButton value="Calendar" onClick={() => moveToPage("Calendar")}>
        달력 확인
      </StyledButton>
      <StyledButton value="Calendar">카메라</StyledButton>
    </CalendarSelectionContainer>
  );
};

export default CalendarSelectionPage;
