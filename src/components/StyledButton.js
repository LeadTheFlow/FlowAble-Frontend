import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 2rem;
  border-style: none;
  border-radius: 4dvh;
  min-width: 60%;
  padding: 1rem;
  margin: 1rem;
  color: white;

  /* 각 버튼에 대한 배경색 지정 */
  ${(props) => {
    switch (props.value) {
      case "Calendar":
        return "background-color: #FF8989;";
      case "Product":
        return "background-color: #FFD600;";
      case "Restroom":
        return "background-color: #1271FF; color: white;";
      default:
        return "background-color: #92D14F;";
    }
  }}

  &:hover {
    filter: brightness(90%);
  }
`;

export default StyledButton;
