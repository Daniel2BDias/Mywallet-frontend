import styled from "styled-components";

export default function MOTD({ navigate, text }) {
  return <StyledMOTD onClick={navigate}>{text}</StyledMOTD>;
}

const StyledMOTD = styled.p`
  color: white;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
