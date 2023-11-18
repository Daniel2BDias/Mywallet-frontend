import styled from "styled-components";

const StyledAuthButton = styled.button`
  height: 50px;
  width: 326px;
  background-color: #a328d6;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin: 10px 0;

  &:disabled {
    opacity: 70%;
    transform: none !important;
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default StyledAuthButton;
