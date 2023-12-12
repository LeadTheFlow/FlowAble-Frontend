import styled from 'styled-components';

const ModalButton = styled.button`
  font-size: 1.5rem;
  border-style: none;
  border-radius: 4dvh;
  min-width: 60%;
  padding: 0.8rem;
  margin: 0.5rem;
  color: black;
  cursor: pointer;
  /* 각 버튼에 대한 배경색 지정 */
  ${(props) => {
    switch (props.value) {
      case 'Calendar':
        return 'background-color: #EC524B;';
      case 'Product':
        return 'background-color: #FFD600;';
      case 'Restroom':
        return 'background-color: #4C8DFF;';
      default:
        return 'background-color: #92D14F;';
    }
  }}

  &:hover {
    filter: brightness(90%);
  }
`;

export default ModalButton;
