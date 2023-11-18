import styled from "styled-components";

export default function LOGO() {
  return <StyledLogo>MyWallet</StyledLogo>
}

const StyledLogo = styled.h1`
  font-family: "Saira Stencil One", cursive;
  height: 20vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 32px;
  color: white;
  margin-bottom: 10px;
`;
