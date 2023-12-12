import React from 'react';
import calenderImg from '../../assets/calenderImg.png';
import styled from 'styled-components';

const CalenderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CalendarPage = () => {
  return (
    <CalenderContainer>
      <img src={calenderImg} alt="calender" />
    </CalenderContainer>
  );
};

export default CalendarPage;
